/*
==================================================
File Name:    ExplainabilityAccordion.tsx
Created On:   12/30/2025
Purpose:      Displays explainable AI reasoning
              in an expandable, user-friendly
              accordion format.
==================================================
*/

import { useState } from "react";

export default function ExplainabilityAccordion({
  explanation,
}: {
  explanation: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className="accordion-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        Why this decision?
      </button>

      {open && (
        <div className="accordion-content">
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
