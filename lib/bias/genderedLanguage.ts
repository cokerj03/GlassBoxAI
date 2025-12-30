/*
==================================================
File Name:    genderedLanguage.ts
Created On:   12/29/2025
Purpose:      Detects gender-coded language in
              job descriptions that may introduce
              unintended bias.
==================================================
*/

const MASCULINE_CODED_WORDS = [
  "aggressive",
  "dominant",
  "competitive",
  "rockstar",
  "ninja",
  "assertive"
];

const FEMININE_CODED_WORDS = [
  "supportive",
  "nurturing",
  "collaborative",
  "empathetic",
  "understanding"
];

export function detectGenderedLanguage(text: string): string[] {
  const found: string[] = [];
  const lower = text.toLowerCase();

  MASCULINE_CODED_WORDS.forEach(word => {
    if (lower.includes(word)) found.push(word);
  });

  FEMININE_CODED_WORDS.forEach(word => {
    if (lower.includes(word)) found.push(word);
  });

  return found;
}
