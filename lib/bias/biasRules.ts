/*
==================================================
File Name:    biasRules.ts
Created On:   12/29/2025
Purpose:       Defines thresholds for detecting
              ethical risk signals in AI decisions.
==================================================
*/

export const BIAS_RULES = {
  LOW_CONFIDENCE: 0.5,
  KEYWORD_OVERWEIGHT: 0.9,
  EDUCATION_OVER_EXPERIENCE_RATIO: 1.2,
  MISSING_DATA_THRESHOLD: 0.3
};