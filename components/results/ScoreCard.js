const ratingLabels = {
  green: 'Strong',
  amber: 'Needs Attention',
  red: 'Concerning',
};

export default function ScoreCard({ dimension }) {
  const { result } = dimension;

  return (
    <div className="bg-white rounded-xl border border-[#2B211C]/10 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">
            {dimension.icon}
          </span>
          <h3 className="font-body font-bold text-lg text-[#2B211C]">
            {dimension.title}
          </h3>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: result.color, color: result.rating === 'amber' ? '#2B211C' : '#FFFFFF' }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: result.rating === 'amber' ? 'rgba(43,33,28,0.35)' : 'rgba(255,255,255,0.5)' }}
            aria-hidden="true"
          />
          {ratingLabels[result.rating]}
        </span>
      </div>
      <p className="text-sm text-[#2B211C]/50">{dimension.description}</p>
    </div>
  );
}
