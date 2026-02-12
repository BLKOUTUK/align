import { answerOptions } from '../../lib/questions';

export default function QuestionCard({ question, value, onChange }) {
  return (
    <div className="bg-white rounded-xl border border-[#1B1B3A]/10 p-5 shadow-sm">
      <p className="font-body text-[#1B1B3A] font-medium mb-1">
        {question.text}
      </p>
      {question.hint && (
        <p className="text-sm text-[#1B1B3A]/50 mb-4">{question.hint}</p>
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
                    ? 'text-white shadow-md scale-[1.02]'
                    : 'bg-white text-[#1B1B3A]/70 border-[#1B1B3A]/10 hover:border-[#1B1B3A]/30'
                }
              `}
              style={
                isSelected
                  ? { backgroundColor: option.color, borderColor: option.color }
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
