import React from 'react';

/**
 * ElderCareAI Logo — inline SVG
 * Two-tone heart (Leaf green + Sky blue) with elderly couple silhouette
 * and "ElderCare AI" wordmark.
 *
 * @param {string} className — additional Tailwind classes
 * @param {boolean} wordmark — show the text wordmark (default true)
 * @param {'dark'|'light'} variant — 'dark' for dark backgrounds (white text)
 */
export default function Logo({ className = '', wordmark = true, variant = 'dark' }) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0A0A0A';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/original.jpg"
        alt="ElderCare AI Logo"
        className="h-10 w-auto object-contain rounded"
      />

      {/* Wordmark */}
      {wordmark && (
        <span className="flex items-baseline gap-0.5">
          <span
            className="font-display font-bold text-xl tracking-tight"
            style={{ color: textColor }}
          >
            ElderCare
          </span>
          <span
            className="font-body font-bold text-xl"
            style={{ color: '#38B6FF' }}
          >
            AI
          </span>
        </span>
      )}
    </span>
  );
}
