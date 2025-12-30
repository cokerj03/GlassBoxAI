/*
==================================================
File Name:    scoringEngine.ts
Created On:   12/29/2025
Purpose:      Computes weighted scores and returns
              explainable AI decisions.
==================================================
*/

import { extractFeatures } from "./featureExtractor";
import { DECISION_THRESHOLDS } from "./thresholds";
import { ScoringResult } from "@/lib/types";

export function runScoringEngine(
  resumeText: string,
  jobText: string
): ScoringResult {
  const features = extractFeatures(resumeText, jobText);

  const keywordScore = features.keywordMatchRatio;
  const confidence = Math.min(keywordScore, 1);

  let decision: ScoringResult["decision"] = "REJECT";

  if (confidence >= DECISION_THRESHOLDS.PASS) {
    decision = "PASS";
  } else if (confidence >= DECISION_THRESHOLDS.REVIEW) {
    decision = "REVIEW";
  }

  return {
    decision,
    confidence,
    features: [
      {
        name: "Keyword Match",
        weight: 1.0,
        score: keywordScore,
        evidence: features.keywordMatches.slice(0, 10)
      }
    ]
  };
}
