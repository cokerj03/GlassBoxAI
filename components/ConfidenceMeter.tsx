/*
==================================================
File Name:    ConfidenceMeter.tsx
Created On:   12/30/2025
Purpose:      Visualizes AI confidence score
              as an accessible progress meter,
              with smooth animation updates.
==================================================
*/

export default function ConfidenceMeter({ confidence }: { confidence: number }) {
  const percentage = Math.max(0, Math.min(100, Math.round(confidence * 100)));

  return (
    <div className="confidence-meter">
      <div className="confidence-label">
        Confidence: <strong>{percentage}%</strong>
      </div>

      <div className="confidence-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div className="confidence-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
