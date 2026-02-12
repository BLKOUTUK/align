import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import OverallScore from '../components/results/OverallScore';
import ScoreCard from '../components/results/ScoreCard';
import FeedbackBlock from '../components/results/FeedbackBlock';
import { scoreAll } from '../lib/scoring';
import { generateFeedback } from '../lib/feedback';

export default function Results() {
  const router = useRouter();
  const [scores, setScores] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('assessAlignAnswers');
    if (!stored) {
      router.replace('/assess');
      return;
    }

    const answers = JSON.parse(stored);
    const result = scoreAll(answers);
    setScores(result);
    setFeedbackText(generateFeedback(result));
  }, [router]);

  if (!scores) {
    return (
      <Layout title="Results">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-[#1B1B3A]/50">Loading results...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Results">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-[#1B1B3A] mb-2">
            Your Assessment
          </h1>
          <p className="text-[#1B1B3A]/60">
            Here&apos;s how the research proposal scored across the five
            dimensions of equitable partnership.
          </p>
        </div>

        {/* Overall */}
        <div className="mb-8">
          <OverallScore overall={scores.overall} />
        </div>

        {/* Dimension scores */}
        <div className="space-y-4 mb-10">
          {scores.dimensions.map((dim) => (
            <ScoreCard key={dim.id} dimension={dim} />
          ))}
        </div>

        {/* Feedback */}
        <div className="mb-10">
          <FeedbackBlock feedbackText={feedbackText} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/assess"
            className="px-6 py-3 rounded-xl font-medium text-center border-2 border-[#1B1B3A]/20 text-[#1B1B3A] hover:border-[#1B1B3A]/40 transition-colors no-underline"
          >
            Assess Another
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-medium text-center text-[#1B1B3A]/50 hover:text-[#1B1B3A] transition-colors no-underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
