/*
==================================================
File Name:    page.tsx
Created On:   12/30/2025
Purpose:      Results dashboard for a completed
              AI resume audit. Displays decision,
              confidence, explainability, ethics,
              and export options.
==================================================
*/


import { Suspense } from "react";
import ResultsClient from "./results-client";

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="page-loading">Loading results…</div>}>
      <ResultsClient />
    </Suspense>
  );
}
