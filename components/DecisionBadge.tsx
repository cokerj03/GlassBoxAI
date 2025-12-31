/*
==================================================
File Name:    DecisionBadge.tsx
Created On:   12/30/2025
Purpose:      Displays the AI decision outcome
              (Pass / Review / Reject) in a
              color-coded, scannable badge.
==================================================
*/

export default function DecisionBadge({ decision }: { decision: string }) {
  const color =
    decision === "APPROVE"
      ? "risk-low"
      : decision === "REVIEW"
      ? "risk-medium"
      : "risk-high";

  return (
    <div className={`decision-badge ${color}`}>
      {decision}
    </div>
  );
}

