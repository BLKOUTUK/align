import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { dimensions, answerOptions, totalQuestions } from '../lib/questions';

// Unlisted page: nothing links here. Built for the Alliance AI-alignment
// discussion — an AI reads the same research request and answers the same
// ten questions, so the two readings can be compared.

const FUNCTION_URL =
  'https://bgjengudzfickgomjqmz.supabase.co/functions/v1/align-second-reader';

const optionByValue = Object.fromEntries(
  answerOptions.map((o) => [o.value, o])
);

function AnswerChip({ who, value }) {
  const option = optionByValue[value];
  if (!option) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-xs uppercase tracking-wide text-[#1B1B3A]/40">
        {who}
      </span>
      <span
        className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: option.color }}
      >
        {option.label}
      </span>
    </span>
  );
}

export default function SecondReader() {
  const [humanAnswers, setHumanAnswers] = useState(null);
  const [consent, setConsent] = useState(false);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // idle | working | done
  const [error, setError] = useState('');
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('assessAlignAnswers');
    if (stored) {
      try {
        setHumanAnswers(JSON.parse(stored));
      } catch {
        setHumanAnswers({});
      }
    } else {
      setHumanAnswers({});
    }
  }, []);

  if (humanAnswers === null) {
    return (
      <Layout title="Second Reader">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-[#1B1B3A]/50">Loading...</p>
        </div>
      </Layout>
    );
  }

  const hasFullAssessment =
    Object.keys(humanAnswers).length === totalQuestions;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setStatus('working');
    setAiResult(null);
    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Try again.');
      }
      setAiResult(data);
      setStatus('done');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
      setStatus('idle');
    }
  }

  const aiById = aiResult
    ? Object.fromEntries(aiResult.answers.map((a) => [a.id, a]))
    : {};

  return (
    <Layout title="Second Reader">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#E8A838]/15 text-[#8a6420] mb-3">
            Demonstration — not a public feature
          </span>
          <h1 className="font-display text-3xl text-[#1B1B3A] mb-2">
            AI second reader
          </h1>
          <p className="text-[#1B1B3A]/60">
            Paste the research request you just assessed. An AI reads it and
            answers the same ten questions, so you can see where its reading
            agrees with yours — and where it doesn&apos;t. The AI is a second
            reader, not the judge: where you differ, your knowledge of your
            community wins.
          </p>
        </div>

        {!hasFullAssessment && (
          <div className="bg-white rounded-xl border border-[#1B1B3A]/10 p-6 shadow-sm mb-8">
            <p className="text-[#1B1B3A] font-medium mb-2">
              Complete your own assessment first
            </p>
            <p className="text-sm text-[#1B1B3A]/60 mb-4">
              The second reader shows an AI&apos;s answers alongside yours. It
              needs your reading of the proposal before it can compare.
            </p>
            <Link
              href="/assess"
              className="inline-block px-5 py-2.5 rounded-xl font-medium bg-[#1B1B3A] text-white hover:bg-[#2a2a5a] transition-colors no-underline"
            >
              Start the assessment
            </Link>
          </div>
        )}

        {hasFullAssessment && status !== 'done' && (
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="bg-white rounded-xl border border-[#1B1B3A]/10 p-6 shadow-sm mb-4">
              <label
                htmlFor="proposal-text"
                className="block text-[#1B1B3A] font-medium mb-2"
              >
                The research request, as you received it
              </label>
              <textarea
                id="proposal-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                placeholder="Paste the email, proposal, or partnership request here..."
                className="w-full rounded-lg border border-[#1B1B3A]/20 p-3 text-sm text-[#1B1B3A] focus:outline-none focus:border-[#E8A838]"
              />
              <p className="text-xs text-[#1B1B3A]/40 mt-1">
                At least a few paragraphs — the AI can only read what you give
                it.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#1B1B3A]/10 p-6 shadow-sm mb-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-[#1B1B3A]/70">
                  I understand that the text I paste will be sent to an AI
                  model to be scored against the same ten questions. It is
                  processed once and <strong>not stored</strong> — this site
                  keeps no copy and writes nothing to any database. My own
                  answers stay in my browser as before. Nothing is sent until
                  I press the button.
                </span>
              </label>
            </div>

            {error && (
              <p className="text-sm text-[#EF4444] mb-4" role="alert">
                {error}
              </p>
            )}

            <p className="sr-only" aria-live="polite">
              {status === 'working'
                ? 'Reading the proposal. This takes about half a minute.'
                : ''}
            </p>

            <button
              type="submit"
              disabled={!consent || text.trim().length < 200 || status === 'working'}
              className="px-6 py-3 rounded-xl font-medium bg-[#1B1B3A] text-white hover:bg-[#2a2a5a] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'working'
                ? 'Reading the proposal — about half a minute...'
                : 'Ask the second reader'}
            </button>
          </form>
        )}

        {status === 'done' && aiResult && (
          <div className="mb-10">
            <div className="mb-6">
              <h2 className="font-display text-2xl text-[#1B1B3A] mb-1">
                Two readings, side by side
              </h2>
              <p className="text-sm text-[#1B1B3A]/60">
                Where the answers differ, that&apos;s a conversation — not a
                correction.
              </p>
            </div>

            {dimensions.map((dim) => (
              <div key={dim.id} className="mb-6">
                <h3 className="font-display text-lg text-[#1B1B3A] mb-3">
                  <span role="img" aria-hidden="true" className="mr-2">
                    {dim.icon}
                  </span>
                  {dim.title}
                </h3>
                <div className="space-y-3">
                  {dim.questions.map((q) => {
                    const human = humanAnswers[q.id];
                    const ai = aiById[q.id];
                    const differs = ai && human !== ai.value;
                    return (
                      <div
                        key={q.id}
                        className={`bg-white rounded-xl border p-5 shadow-sm ${
                          differs
                            ? 'border-[#E8A838]'
                            : 'border-[#1B1B3A]/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-sm font-medium text-[#1B1B3A]">
                            {q.text}
                          </p>
                          {differs && (
                            <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8A838]/15 text-[#8a6420]">
                              Differs
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 mb-2">
                          <AnswerChip who="You" value={human} />
                          {ai && <AnswerChip who="AI" value={ai.value} />}
                        </div>
                        {ai && (
                          <p className="text-sm text-[#1B1B3A]/60">
                            {ai.rationale}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <p className="text-xs text-[#1B1B3A]/40 mt-6">
              Second reading by {aiResult.model} via OpenRouter. The pasted
              text was processed once and not stored.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setAiResult(null);
                  setText('');
                  setConsent(false);
                }}
                className="px-6 py-3 rounded-xl font-medium border-2 border-[#1B1B3A]/20 text-[#1B1B3A] hover:border-[#1B1B3A]/40 transition-colors cursor-pointer"
              >
                Read another
              </button>
              <Link
                href="/results"
                className="px-6 py-3 rounded-xl font-medium text-center bg-[#1B1B3A] text-white hover:bg-[#2a2a5a] transition-colors no-underline"
              >
                Back to your results
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
