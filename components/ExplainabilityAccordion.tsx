/*
==================================================
File Name:    ExplainabilityAccordion.tsx
Created On:   12/30/2025
Purpose:      Displays explainable AI reasoning
              in an expandable, user-friendly
              accordion format.
==================================================
*/

"use client";

import { useState } from "react";

export default function ExplainabilityAccordion({
  explanation
}: {
  explanation: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button onClick={() => setOpen(!open)}>
        Explain Decision
      </button>
      {open && <p>{explanation}</p>}
    </div>
  );
}
