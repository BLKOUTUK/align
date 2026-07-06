import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import DimensionSection from '../components/assess/DimensionSection';
import ProgressBar from '../components/assess/ProgressBar';
import { dimensions, totalQuestions } from '../lib/questions';

export default function Assess() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});

  // Restore a previous session's answers so users can edit without starting over
  useEffect(() => {
    const stored = sessionStorage.getItem('assessAlignAnswers');
    if (stored) {
      try {
        setAnswers(JSON.parse(stored));
      } catch {
        // ignore corrupt state
      }
    }
  }, []);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  function handleAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Store answers in sessionStorage so the results page can read them
    sessionStorage.setItem('assessAlignAnswers', JSON.stringify(answers));
    router.push('/results');
  }

  return (
    <Layout title="Assessment">
      <ProgressBar answeredCount={answeredCount} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-[#2B211C] mb-2">
            Assess the proposal
          </h1>
          <p className="text-[#2B211C]/60">
            For each question, select the option that best describes the
            research partnership request you&apos;re evaluating.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {dimensions.map((dim) => (
            <DimensionSection
              key={dim.id}
              dimension={dim}
              answers={answers}
              onAnswer={handleAnswer}
            />
          ))}

          <div className="sticky bottom-0 bg-[#F6F2EA]/95 backdrop-blur-sm border-t border-[#2B211C]/10 py-4 -mx-4 px-4 mt-8">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <p className="text-sm text-[#2B211C]/50">
                {allAnswered
                  ? 'All questions answered — ready to see results'
                  : `${totalQuestions - answeredCount} question${
                      totalQuestions - answeredCount === 1 ? '' : 's'
                    } remaining`}
              </p>
              <button
                type="submit"
                disabled={!allAnswered}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all
                  ${
                    allAnswered
                      ? 'bg-[#2B211C] text-white hover:bg-[#3D2E26] shadow-lg shadow-[#2B211C]/20 cursor-pointer'
                      : 'bg-[#2B211C]/20 text-[#2B211C]/40 cursor-not-allowed'
                  }
                `}
              >
                See Results
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
