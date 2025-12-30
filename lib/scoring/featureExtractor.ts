/*
==================================================
File Name:    featureExtractor.ts
Created On:   12/29/2025
Purpose:      Extracts structured, explainable
              features from resume and job text.
==================================================
*/

export function extractFeatures(resume: string, job: string) {
  const resumeLower = resume.toLowerCase();
  const jobLower = job.toLowerCase();

  const keywords = jobLower.split(/\W+/);

  const matchedKeywords = keywords.filter(word =>
    resumeLower.includes(word)
  );

  return {
    keywordMatches: matchedKeywords,
    keywordMatchRatio: matchedKeywords.length / keywords.length
  };
}
