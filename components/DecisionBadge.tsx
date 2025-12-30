/*
==================================================
File Name:    DecisionBadge.tsx
Created On:   12/30/2025
Purpose:      Displays the AI decision outcome
              (Pass / Review / Reject) in a
              color-coded, scannable badge.
==================================================
*/

type Decision = "PASS" | "REVIEW" | "REJECT";

export default function DecisionBadge({ decision }: { decision: Decision }) {
  const classMap: Record<Decision, string> = {
    PASS: "badge-pass",
    REVIEW: "badge-review",
    REJECT: "badge-reject",
  };

  return (
    <span className={`decision-badge ${classMap[decision]}`}>
      {decision}
    </span>
  );
}
