import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SITE = 'https://blkoutuk.github.io/bmhwa-manifesto/';

export default function Layout({ children, title = 'Assess & Align' }) {
  const { basePath } = useRouter();
  return (
    <>
      <Head>
        <title>{title} | Black Mental Health Manifesto</title>
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
        {/* Site chrome — matches the manifesto site's dark header in both registers */}
        <header className="bg-[#2B211C] border-b border-[#D89A2D]/20 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 no-underline shrink-0">
              <img
                src={`${basePath}/bmhm-logo.avif`}
                alt="Black Mental Health Manifesto"
                className="h-12 w-auto"
              />
              <span className="font-display text-lg text-white">
                Assess &amp; Align
              </span>
            </Link>
            <nav aria-label="Manifesto site" className="flex items-center gap-1 text-sm">
              <a
                href={SITE}
                className="px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Manifesto site
              </a>
              <a
                href={`${SITE}learning`}
                className="hidden sm:block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Learning
              </a>
              <a
                href={`${SITE}evidence/`}
                className="hidden sm:block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Evidence
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#2B211C] py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <img
              src={`${basePath}/bmhm-logo.avif`}
              alt="Black Mental Health Manifesto"
              className="h-8 w-auto mx-auto mb-3"
            />
            <p className="text-sm text-white/60">
              Built by the{' '}
              <a
                href="https://bmhwa.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D89A2D] hover:underline font-medium"
              >
                Black Mental Health &amp; Wellbeing Alliance
              </a>
            </p>
            <nav aria-label="Manifesto site pages" className="mt-3 text-sm">
              <a href={SITE} className="text-white/60 hover:text-[#D89A2D]">The Manifesto</a>
              <span className="text-white/25 mx-2">&middot;</span>
              <a href={`${SITE}learning`} className="text-white/60 hover:text-[#D89A2D]">Learning</a>
              <span className="text-white/25 mx-2">&middot;</span>
              <a href={`${SITE}evidence/`} className="text-white/60 hover:text-[#D89A2D]">Evidence Library</a>
              <span className="text-white/25 mx-2">&middot;</span>
              <a href={`${SITE}take-action`} className="text-white/60 hover:text-[#D89A2D]">Take Action</a>
            </nav>
            <p className="text-xs text-white/30 mt-3">
              Manifesto Recommendation 12 &mdash; Investing in community-led research
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
