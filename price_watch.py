import asyncio
import json
import os
import re
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Any, Optional

from dotenv import load_dotenv
from playwright.async_api import async_playwright

load_dotenv()


# ---------- Config models ----------

@dataclass
class WatchItem:
    name: str
    url: str
    target_price: float
    price_selector: Optional[str] = None
    currency: str = "GBP"


# ---------- Utilities ----------

PRICE_RE = re.compile(r"£\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+(?:\.[0-9]{2})?)")


def parse_price(text: str) -> Optional[float]:
    if not text:
        return None
    match = PRICE_RE.search(text)
    if not match:
        return None
    raw = match.group(1).replace(",", "")
    try:
        return float(raw)
    except ValueError:
        return None


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def db_connect(db_path: str) -> sqlite3.Connection:
    connection = sqlite3.connect(db_path)
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS observations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ts_utc TEXT NOT NULL,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            price REAL,
            currency TEXT,
            ok INTEGER NOT NULL,
            note TEXT
        )
        """
    )
    connection.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_obs_name_ts ON observations(name, ts_utc)
        """
    )
    connection.commit()
    return connection


def last_price(connection: sqlite3.Connection, name: str) -> Optional[float]:
    cursor = connection.execute(
        "SELECT price FROM observations WHERE name=? AND price IS NOT NULL ORDER BY id DESC LIMIT 1",
        (name,),
    )
    row = cursor.fetchone()
    return float(row[0]) if row and row[0] is not None else None


# ---------- Alerting ----------

def send_email(subject: str, body: str) -> None:
    recipient = os.getenv("ALERT_EMAIL_TO")
    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "465"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASS")

    if not (recipient and host and user and password):
        return  # silently skip if not configured

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = user
    message["To"] = recipient
    message.set_content(body)

    import smtplib

    with smtplib.SMTP_SSL(host, port) as smtp:
        smtp.login(user, password)
        smtp.send_message(message)


# ---------- Extraction strategies ----------

async def extract_price_by_selector(page, selector: str) -> Optional[float]:
    try:
        locator = page.locator(selector).first
        await locator.wait_for(state="visible", timeout=15000)
        text_content = (await locator.inner_text()) or ""
        price = parse_price(text_content)
        if price is not None:
            return price

        # Sometimes price is in an attribute like content="299.00"
        content = await locator.get_attribute("content")
        if content:
            try:
                return float(content.strip())
            except ValueError:
                pass
        return None
    except Exception:
        return None


async def extract_price_from_jsonld(page) -> Optional[float]:
    """
    Many product pages embed schema.org Product JSON-LD with offers.price.
    """
    try:
        scripts = await page.locator("script[type='application/ld+json']").all_inner_texts()
        for script_content in scripts:
            script_content = script_content.strip()
            if not script_content:
                continue
            for candidate in _coerce_jsonld_objects(script_content):
                price = _find_offer_price(candidate)
                if price is not None:
                    return price
    except Exception:
        pass
    return None


def _coerce_jsonld_objects(raw: str) -> list[dict[str, Any]]:
    objects: list[dict[str, Any]] = []
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            objects.append(data)
        elif isinstance(data, list):
            objects.extend([item for item in data if isinstance(item, dict)])
    except Exception:
        for match in re.finditer(r"\{.*\}", raw, flags=re.DOTALL):
            try:
                parsed = json.loads(match.group(0))
                if isinstance(parsed, dict):
                    objects.append(parsed)
            except Exception:
                continue
    return objects


def _find_offer_price(obj: Any) -> Optional[float]:
    if isinstance(obj, dict):
        offers = obj.get("offers")
        if isinstance(offers, dict):
            price = offers.get("price") or offers.get("lowPrice") or offers.get("highPrice")
            if price is not None:
                try:
                    return float(str(price).replace(",", "").strip())
                except ValueError:
                    pass
        if isinstance(offers, list):
            for offer in offers:
                price = _find_offer_price({"offers": offer})
                if price is not None:
                    return price

        for value in obj.values():
            price = _find_offer_price(value)
            if price is not None:
                return price

    elif isinstance(obj, list):
        for item in obj:
            price = _find_offer_price(item)
            if price is not None:
                return price
    return None


async def extract_price_by_regex(page) -> Optional[float]:
    try:
        html = await page.content()
        return parse_price(html)
    except Exception:
        return None


# ---------- Main watcher ----------

async def check_item(page, item: WatchItem, screenshot_dir: Optional[str] = None) -> tuple[Optional[float], bool, str]:
    try:
        await page.goto(item.url, wait_until="domcontentloaded", timeout=60000)

        price: Optional[float] = None
        note = ""

        if item.price_selector:
            price = await extract_price_by_selector(page, item.price_selector)
            note = "selector" if price is not None else "selector_failed"

        if price is None:
            price = await extract_price_from_jsonld(page)
            note = "jsonld" if price is not None else (note + "|jsonld_failed")

        if price is None:
            price = await extract_price_by_regex(page)
            note = "regex" if price is not None else (note + "|regex_failed")

        ok = price is not None
        if not ok and screenshot_dir:
            os.makedirs(screenshot_dir, exist_ok=True)
            safe_name = re.sub(r"[^a-zA-Z0-9._-]+", "_", item.name)[:80]
            path = os.path.join(screenshot_dir, f"{safe_name}.png")
            try:
                await page.screenshot(path=path, full_page=True)
                note += f"|screenshot={path}"
            except Exception:
                pass

        return price, ok, note or "no_note"
    except Exception as exc:
        return None, False, f"exception:{type(exc).__name__}"


async def run(watchlist_path: str, db_path: str, headed: bool = False, screenshot_dir: str = "screenshots") -> int:
    with open(watchlist_path, "r", encoding="utf-8") as file:
        raw_items = json.load(file)

    items = [WatchItem(**entry) for entry in raw_items]
    connection = db_connect(db_path)

    alerts: list[str] = []

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=not headed)
        context = await browser.new_context()
        page = await context.new_page()

        for item in items:
            prev = last_price(connection, item.name)
            price, ok, note = await check_item(page, item, screenshot_dir=screenshot_dir)

            connection.execute(
                "INSERT INTO observations(ts_utc,name,url,price,currency,ok,note) VALUES(?,?,?,?,?,?,?)",
                (utc_now_iso(), item.name, item.url, price, item.currency, 1 if ok else 0, note),
            )
            connection.commit()

            if price is not None:
                crossed = (price <= item.target_price) and (prev is None or prev > item.target_price)
                if crossed:
                    alerts.append(
                        f"{item.name}\n{item.url}\nNow: £{price:.2f} (target £{item.target_price:.2f})\nPrev: {('£%.2f' % prev) if prev else 'n/a'}\n"
                    )

        await context.close()
        await browser.close()

    connection.close()

    if alerts:
        body = "\n---\n".join(alerts)
        print("ALERTS:\n" + body)
        send_email("Price alert: target hit", body)
        return 2

    return 0


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--watchlist", default="watchlist.json")
    parser.add_argument("--db", default="prices.sqlite")
    parser.add_argument("--headed", action="store_true", help="Run with browser UI for debugging")
    args = parser.parse_args()

    raise SystemExit(asyncio.run(run(args.watchlist, args.db, headed=args.headed)))
