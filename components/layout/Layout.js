import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children, title = 'Assess & Align' }) {
  const { basePath } = useRouter();
  return (
    <>
      <Head>
        <title>{title} | BMHWA</title>
        <meta
          name="description"
          content="Helping Black voluntary sector leaders evaluate research partnership requests for equity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F6F2EA]">
        <header className="border-b border-[#2B211C]/10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <img
                src={`${basePath}/bmhm-logo.avif`}
                alt="Black Mental Health Manifesto"
                className="h-10 w-auto"
              />
              <span className="font-display text-xl text-[#2B211C]">
                Assess & Align
              </span>
            </Link>
            <a
              href="https://bmhwa.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#2B211C]/60 hover:text-[#C8341F] transition-colors"
            >
              BMHWA
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#2B211C]/10 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <img
              src={`${basePath}/bmhm-logo.avif`}
              alt="Black Mental Health Manifesto"
              className="h-8 w-auto mx-auto mb-3"
            />
            <p className="text-sm text-[#2B211C]/50">
              Built by the{' '}
              <a
                href="https://bmhwa.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8341F] hover:underline font-medium"
              >
                Black Mental Health &amp; Wellbeing Alliance
              </a>
            </p>
            <p className="text-xs text-[#2B211C]/30 mt-2">
              Manifesto Recommendation 12 — Investing in community-led research
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
