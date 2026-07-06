import { totalQuestions } from '../../lib/questions';

export default function ProgressBar({ answeredCount }) {
  const pct = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="sticky top-0 z-10 bg-[#F6F2EA]/95 backdrop-blur-sm border-b border-[#2B211C]/10 py-3 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-[#2B211C]/70">
            {answeredCount} of {totalQuestions} questions answered
          </span>
          <span className="font-data text-sm font-bold text-[#C8341F]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#2B211C]/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              backgroundColor: pct === 100 ? '#3F6B4A' : '#D89A2D',
            }}
          />
        </div>
      </div>
    </div>
  );
}
