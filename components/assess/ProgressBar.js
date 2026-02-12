import { totalQuestions } from '../../lib/questions';

export default function ProgressBar({ answeredCount }) {
  const pct = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="sticky top-0 z-10 bg-[#FBF8F3]/95 backdrop-blur-sm border-b border-[#1B1B3A]/10 py-3 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-[#1B1B3A]/70">
            {answeredCount} of {totalQuestions} questions answered
          </span>
          <span className="text-sm font-medium text-[#E8A838]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#1B1B3A]/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              backgroundColor: pct === 100 ? '#22C55E' : '#E8A838',
            }}
          />
        </div>
      </div>
    </div>
  );
}
