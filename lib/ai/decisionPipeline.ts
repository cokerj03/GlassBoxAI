/*
==================================================
File Name:    decisionPipeline.ts
Created On:   12/29/2025
Purpose:      Central AI decision pipeline that
              orchestrates preprocessing,
              scoring, explainability, and
              ethical risk evaluation.
==================================================
*/

import { preprocessText } from "@/lib/ai/preprocess";
import { runScoringEngine } from "@/lib/scoring/scoringEngine";
import { scanBias } from "@/lib/bias/biasScanner";
import { buildExplanation } from "@/lib/explainability/explanationBuilder";
import { AIDecisionOutput } from "@/lib/types";


export function runAIDecisionPipeline(
  resumeText: string,
  jobText: string
): AIDecisionOutput {
  // 1️⃣ Preprocess inputs
  const cleanResume = preprocessText(resumeText);
  const cleanJob = preprocessText(jobText);

  // 2️⃣ Run scoring engine
  const scoring = runScoringEngine(cleanResume, cleanJob);

  // 3️⃣ Run ethics & bias scan
  const biasAudit = scanBias(scoring, cleanJob);

  // 4️⃣ Build explanation
  const explanation = buildExplanation(scoring, biasAudit);

  // 5️⃣ Return unified AI decision output
  return {
    decision: scoring.decision,
    confidence: scoring.confidence,
    explanation,
    biasAudit,
    reasoningSignals: scoring.features
  };
}
