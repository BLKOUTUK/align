import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout title="Assess & Align">
      {/* Hero — signature dark band (mirrors the manifesto page-hero) */}
      <section className="aa-hero py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D89A2D]/15 text-[#D89A2D] text-sm font-semibold mb-6">
            <span>Manifesto Recommendation 12</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-6 leading-[0.98]">
            Evaluate research requests
            <br />
            <span className="aa-hero-accent">before you commit</span>
          </h1>
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            A structured tool for Black voluntary sector leaders to assess
            whether a research partnership request meets the standards of equity,
            community voice, and mutual benefit your community deserves.
          </p>
          <Link
            href="/assess"
            onClick={() => sessionStorage.removeItem('assessAlignAnswers')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D89A2D] text-[#2B211C] rounded-xl font-bold text-lg hover:bg-[#c2872a] transition-colors no-underline"
          >
            Start Assessment
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-white/55 mt-4">
            Takes about five minutes. Nothing you enter leaves your browser.
          </p>
        </div>
      </section>

      {/* What it does */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl text-[#2B211C] text-center mb-10">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Answer 13 questions',
                desc: 'Structured questions across six dimensions of equitable research: community voice, power, cultural sensitivity, benefit, accountability, and safeguarding.',
              },
              {
                step: '2',
                title: 'See your scores',
                desc: 'Each dimension gets a traffic-light rating — green, amber, or red — so you can see exactly where the proposal is strong or weak.',
              },
              {
                step: '3',
                title: 'Send your feedback',
                desc: 'A professional feedback letter is generated for you to copy and send to the researcher, based on your assessment.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-[#2B211C]/10 p-6 shadow-sm"
              >
                <div className="font-data w-8 h-8 rounded-full bg-[#D89A2D] text-[#2B211C] flex items-center justify-center font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-body font-bold text-lg text-[#2B211C] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#2B211C]/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#2B211C] rounded-2xl p-8 text-white border-l-4 border-[#D89A2D]">
            <p className="aa-eyebrow mb-2" style={{ color: '#D89A2D' }}>The problem</p>
            <h2 className="font-display text-2xl mb-4">Why this exists</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Black voluntary sector organisations are frequently approached by
              researchers seeking access to communities — but these partnerships
              are not always equitable. Too often, the community provides the
              data while the institution takes the credit, the funding, and the
              intellectual property.
            </p>
            <p className="text-white/80 leading-relaxed">
              Assess &amp; Align gives you a framework to evaluate whether a
              research request meets the standard of partnership your community
              deserves — and the language to say so.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
