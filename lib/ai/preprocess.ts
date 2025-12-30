/*
==================================================
File Name:    preprocess.ts
Created On:   12/29/2025
Purpose:      Normalizes and sanitizes user input
              before AI inference to ensure
              consistent and fair analysis.
==================================================
*/

export function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();
}
