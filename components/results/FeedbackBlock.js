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
    <div className="bg-white rounded-xl border border-[#2B211C]/10 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2B211C]/10 bg-[#2B211C]/[0.03]">
        <h3 className="font-body font-bold text-lg text-[#2B211C]">
          Your Feedback Letter
        </h3>
        <button
          onClick={handleCopy}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer print:hidden
            ${
              copied
                ? 'bg-[#3F6B4A] text-white'
                : 'bg-[#D89A2D] text-[#2B211C] hover:bg-[#c2872a]'
            }
          `}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>
      <div className="p-5">
        <pre className="whitespace-pre-wrap font-body text-sm text-[#2B211C]/80 leading-relaxed">
          {feedbackText}
        </pre>
      </div>
    </div>
  );
}
