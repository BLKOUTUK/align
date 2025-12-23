# Assess & Align

A web application helping Black voluntary sector leaders in the UK evaluate research requests on Black mental health.

## Project Overview

Assess & Align ensures that research aligns with principles of equity, collaboration, and cultural sensitivity while also educating researchers about power imbalances in research practices. The application analyzes research requests, asks key questions about equity and collaboration, generates feedback for researchers, and aggregates anonymized data to track the impact of research demands on the sector.

## Key Features

- Research request analysis and scraping
- Equity-focused assessment framework 
- LLM-powered feedback generation
- Email integration for request submission
- Analytics dashboard for impact tracking
- Modern neumorphic UI design

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js/Express
- **Database**: NoCoDB
- **Authentication**: Supabase Auth
- **LLM Integration**: Deepseek V3

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- NoCoDB instance
- Supabase account
- Deepseek API access
- Python 3.10+
- Playwright browsers installed (for the price watcher utility)

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/assess-and-align.git
cd assess-and-align
```

2. Install dependencies:
```
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:
```
# In backend directory
cp .env.example .env
```
Edit the `.env` file with your configuration details.

4. Start the development servers:
```
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Price watcher (Python + Playwright)

This repo now includes a standalone, cron-friendly Python script for watching UK retailer product prices (Currys, AO, Appliances Direct, Argos, etc.). It records every check to SQLite and alerts when prices cross your target.

### Install the watcher

```bash
python -m venv .venv
source .venv/bin/activate

pip install playwright python-dotenv
playwright install --with-deps
```

### Configure watchlist and alerts

1. Copy `watchlist.example.json` to `watchlist.json` and update the entries with your product URLs, target prices, and preferred price selectors.
2. (Optional) Copy `.env.example` to `.env` and fill in SMTP settings for email alerts. If you skip this, alerts will print to the console when a price target is crossed.

### Run checks

```bash
python price_watch.py --watchlist watchlist.json --db prices.sqlite
```

Add `--headed` to debug tricky pages in a visible browser window. The script automatically tries three strategies in order: your CSS selector (most reliable), JSON-LD offers price, and a regex fallback. Failed checks can capture screenshots into `screenshots/`.

### Cron example

Run hourly between 7am–11pm UK time:

```cron
0 7-23 * * * /path/to/.venv/bin/python /path/to/price_watch.py --watchlist /path/to/watchlist.json --db /path/to/prices.sqlite >> /path/to/price_watch.log 2>&1
```

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js/Express backend
- `docs/` - Project documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Black voluntary sector leaders who provided feedback and guidance
- All contributors to the development of this tool