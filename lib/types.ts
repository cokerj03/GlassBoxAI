/*
==================================================
File Name:    types.ts
Created On:   12/29/2025
Purpose:      Shared TypeScript interfaces for
              scoring, ethics, and explainability
              across the backend.
              Update Notes: Added AI decision pipeline output
==================================================
*/

export interface ScoringInput {
  resumeText: string;
  jobText: string;
}

export interface ScoringResult {
  decision: "PASS" | "REVIEW" | "REJECT";
  confidence: number;
  features: FeatureScore[];
}

export interface FeatureScore {
  name: string;
  weight: number;
  score: number;
  evidence: string[];
}

export interface BiasAudit {
  flags: string[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  notes: string;
}

export interface AIDecisionOutput {
  decision: "PASS" | "REVIEW" | "REJECT";
  confidence: number;
  explanation: string;
  biasAudit: BiasAudit;
  reasoningSignals: FeatureScore[];
}