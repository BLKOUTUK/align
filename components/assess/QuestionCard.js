import { answerOptions } from '../../lib/questions';

export default function QuestionCard({ question, value, onChange }) {
  return (
    <div className="bg-white rounded-xl border border-[#2B211C]/10 p-5 shadow-sm">
      <p className="font-body text-[#2B211C] font-medium mb-1">
        {question.text}
      </p>
      {question.hint && (
        <p className="text-sm text-[#2B211C]/50 mb-4">{question.hint}</p>
      )}

      <div className="flex gap-3">
        {answerOptions.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(question.id, option.value)}
              className={`
                flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all
                border-2 cursor-pointer
                ${
                  isSelected
                    ? 'shadow-md scale-[1.02]'
                    : 'bg-white text-[#2B211C]/70 border-[#2B211C]/10 hover:border-[#2B211C]/30'
                }
              `}
              style={
                isSelected
                  ? { backgroundColor: option.color, borderColor: option.color, color: option.text }
                  : undefined
              }
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
