import { useState } from 'react';

export default function FeedbackBlock({ feedbackText }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = feedbackText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#1B1B3A]/10 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1B1B3A]/10 bg-[#1B1B3A]/[0.03]">
        <h3 className="font-display text-lg text-[#1B1B3A]">
          Your Feedback Letter
        </h3>
        <button
          onClick={handleCopy}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
            ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-[#E8A838] text-white hover:bg-[#d49730]'
            }
          `}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>
      <div className="p-5">
        <pre className="whitespace-pre-wrap font-body text-sm text-[#1B1B3A]/80 leading-relaxed">
          {feedbackText}
        </pre>
      </div>
    </div>
  );
}
