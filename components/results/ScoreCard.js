const ratingLabels = {
  green: 'Strong',
  amber: 'Needs Attention',
  red: 'Concerning',
};

export default function ScoreCard({ dimension }) {
  const { result } = dimension;

  return (
    <div className="bg-white rounded-xl border border-[#1B1B3A]/10 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">
            {dimension.icon}
          </span>
          <h3 className="font-display text-lg text-[#1B1B3A]">
            {dimension.title}
          </h3>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: result.color }}
        >
          <span
            className="w-2 h-2 rounded-full bg-white/40"
            aria-hidden="true"
          />
          {ratingLabels[result.rating]}
        </span>
      </div>
      <p className="text-sm text-[#1B1B3A]/50">{dimension.description}</p>
    </div>
  );
}
