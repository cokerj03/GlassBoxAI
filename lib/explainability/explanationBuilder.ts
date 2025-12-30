/*
==================================================
File Name:    explanationBuilder.ts
Created On:   12/29/2025
Purpose:      Converts scoring and ethics output
              into a human-readable explanation.
==================================================
*/

import { BiasAudit, ScoringResult } from "@/lib/types";

export function buildExplanation(
  scoring: ScoringResult,
  audit: BiasAudit
): string {
  let explanation = `The system classified this resume as "${scoring.decision}" `;
  explanation += `with a confidence score of ${(
    scoring.confidence * 100
  ).toFixed(1)}%. `;

  explanation += `The primary factor influencing this decision was keyword alignment with the job description. `;

  if (audit.flags.length > 0) {
    explanation += `However, the system detected potential ethical risks (${audit.flags.join(
      ", "
    )}), and recommends human review.`;
  }

  return explanation;
}
