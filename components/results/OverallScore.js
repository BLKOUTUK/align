const overallMessages = {
  green: {
    heading: 'This proposal looks strong',
    body: 'The research partnership request demonstrates a solid commitment to equity, community voice, and mutual benefit. There are strong foundations for a productive collaboration.',
  },
  amber: {
    heading: 'This proposal needs attention',
    body: 'The request shows some positive elements but raises concerns in key areas. A conversation with the researchers about the issues flagged below could help determine whether the partnership can work.',
  },
  red: {
    heading: 'This proposal raises significant concerns',
    body: 'The request has fundamental issues around equity, power, or community benefit that would need to be addressed before any partnership can proceed. The feedback below outlines what needs to change.',
  },
};

export default function OverallScore({ overall }) {
  const msg = overallMessages[overall.rating];

  return (
    <div
      className="rounded-2xl p-8 text-white shadow-lg"
      style={{ backgroundColor: overall.color }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-2xl">
            {overall.rating === 'green'
              ? '✓'
              : overall.rating === 'amber'
              ? '!'
              : '✕'}
          </span>
        </div>
        <h2 className="font-display text-2xl">{msg.heading}</h2>
      </div>
      <p className="text-white/90 leading-relaxed">{msg.body}</p>
    </div>
  );
}
