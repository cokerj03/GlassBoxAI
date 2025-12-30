/*
==================================================
File Name:    biasScanner.ts
Created On:   12/29/2025
Purpose:      Evaluates AI scoring output and
              input context for ethical risk
              signals and fairness concerns.
==================================================
*/

import { BiasAudit, ScoringResult } from "@/lib/types";
import { BIAS_RULES } from "./biasRules";
import { detectGenderedLanguage } from "./genderedLanguage";

export function scanBias(
  scoring: ScoringResult,
  jobText?: string
): BiasAudit {
  const flags: string[] = [];
  let riskLevel: BiasAudit["riskLevel"] = "LOW";

  // 1️⃣ Low confidence signal
  if (scoring.confidence < BIAS_RULES.LOW_CONFIDENCE) {
    flags.push("LOW_CONFIDENCE_DECISION");
    riskLevel = "MEDIUM";
  }

  // 2️⃣ Keyword overweighting
  const keywordFeature = scoring.features.find(
    f => f.name === "Keyword Match"
  );

  if (keywordFeature && keywordFeature.score > BIAS_RULES.KEYWORD_OVERWEIGHT) {
    flags.push("KEYWORD_OVERWEIGHT_RISK");
    riskLevel = "HIGH";
  }

  // 3️⃣ Education vs experience imbalance (heuristic placeholder)
  const educationScore = scoring.features.find(f =>
    f.name.toLowerCase().includes("education")
  )?.score ?? 0;

  const experienceScore = scoring.features.find(f =>
    f.name.toLowerCase().includes("experience")
  )?.score ?? 1;

  if (
    educationScore / experienceScore >
    BIAS_RULES.EDUCATION_OVER_EXPERIENCE_RATIO
  ) {
    flags.push("EDUCATION_OVER_EXPERIENCE_RISK");
    riskLevel = "MEDIUM";
  }

  // 4️⃣ Missing data penalty detection
  if (scoring.confidence < BIAS_RULES.MISSING_DATA_THRESHOLD) {
    flags.push("POTENTIAL_MISSING_DATA_PENALTY");
    riskLevel = "MEDIUM";
  }

  // 5️⃣ Gendered language in job description
  if (jobText) {
    const genderedWords = detectGenderedLanguage(jobText);
    if (genderedWords.length > 0) {
      flags.push("GENDER_CODED_LANGUAGE_DETECTED");
      riskLevel = "MEDIUM";
    }
  }

  return {
    flags,
    riskLevel,
    notes:
      flags.length === 0
        ? "No significant ethical risk signals detected."
        : "One or more ethical risk indicators were identified. Human review is recommended."
  };
}
