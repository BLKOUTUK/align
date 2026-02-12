import QuestionCard from './QuestionCard';

export default function DimensionSection({ dimension, answers, onAnswer }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" role="img" aria-hidden="true">
          {dimension.icon}
        </span>
        <h2 className="font-display text-xl text-[#1B1B3A]">
          {dimension.title}
        </h2>
      </div>
      <p className="text-sm text-[#1B1B3A]/60 mb-4 ml-10">
        {dimension.description}
      </p>

      <div className="space-y-4 ml-10">
        {dimension.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={onAnswer}
          />
        ))}
      </div>
    </section>
  );
}
