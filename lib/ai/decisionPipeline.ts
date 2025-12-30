/*
==================================================
File Name:    decisionPipeline.ts
Created On:   12/29/2025
Purpose:      Central AI decision pipeline that
              orchestrates preprocessing,
              inference, explainability, and
              ethical evaluation.
==================================================
*/

import { preprocessText } from "./preprocess";
import { runScoringEngine } from "@/lib/scoring/scoringEngine";
import { scanBias } from "@/lib/bias/biasScanner";
import { buildExplanation } from "@/lib/explainability/explanationBuilder";
import { AIDecisionOutput } from "@/lib/types";

export function runAIDecisionPipeline(
  resumeText: string,
  jobText: string
): AIDecisionOutput {
  // 1️⃣ Pre-process inputs
  const cleanResume = preprocessText(resumeText);
  const cleanJob = preprocessText(jobText);

  // 2️⃣ AI inference (deterministic)
  const scoring = runScoringEngine(cleanResume, cleanJob);

  // 3️⃣ Ethics & bias evaluation
  const biasAudit = scanBias(scoring);

  // 4️⃣ Human-readable explanation
  const explanation = buildExplanation(scoring, biasAudit);

  // 5️⃣ Return full decision package
  return {
    decision: scoring.decision,
    confidence: scoring.confidence,
    explanation,
    biasAudit,
    reasoningSignals: scoring.features
  };
}
