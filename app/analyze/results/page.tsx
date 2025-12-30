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

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import DecisionBadge from "@/components/DecisionBadge";
import ConfidenceMeter from "@/components/ConfidenceMeter";
import ExplainabilityAccordion from "@/components/ExplainabilityAccordion";
import EthicsIndicators from "@/components/EthicsIndicators";

type ResultsData = {
  requestId: string;
  decision: "PASS" | "REVIEW" | "REJECT";
  confidence_score: number;
  explanation: string;
};

type EthicsData = {
  requestId: string;
  risk_level: "LOW" | "MEDIUM" | "HIGH";
  bias_flags: string[];
  fairness_notes?: string;
};

export default function ResultsPage() {
  const params = useSearchParams();
  const requestId = params.get("id");

  const [results, setResults] = useState<ResultsData | null>(null);
  const [ethics, setEthics] = useState<EthicsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestId) {
      setError("Missing request id.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [resultsRes, ethicsRes] = await Promise.all([
          fetch(`/api/results/${requestId}`),
          fetch(`/api/audit/${requestId}`)
        ]);

        const resultsJson = await resultsRes.json();
        const ethicsJson = await ethicsRes.json();

        if (!resultsRes.ok) throw new Error(resultsJson.error || "Failed to load results");
        if (!ethicsRes.ok) throw new Error(ethicsJson.error || "Failed to load ethics audit");

        setResults(resultsJson);
        setEthics(ethicsJson);
      } catch (err: any) {
        setError(err.message || "Unexpected error loading results");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [requestId]);

  /* -------------------- STATES -------------------- */

  if (loading) {
    return (
      <main className="page-narrow">
        <div className="card">
          <h2>Loading results…</h2>
          <p className="opacity-muted">Analyzing decision and ethics data.</p>
        </div>
      </main>
    );
  }

  if (error || !results || !ethics) {
    return (
      <main className="page-narrow">
        <div className="card">
          <h2>Unable to load results</h2>
          <p className="opacity-muted">{error}</p>

          <div className="flex mt-1">
            <Link href="/analyze" className="button">
              Back to Analyze
            </Link>
            <Link href="/" className="button button-secondary">
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------- SUCCESS -------------------- */

  return (
    <main>
      <div className="card">
        {/* Header */}
        <div className="flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Results</h2>
          <DecisionBadge decision={results.decision} />
        </div>

        {/* Confidence */}
        <div className="mt-1">
          <ConfidenceMeter confidence={results.confidence_score} />
        </div>

        {/* Explainability */}
        <div className="mt-2">
          <h3>Explainability</h3>
          <ExplainabilityAccordion explanation={results.explanation} />
        </div>

        {/* Ethics */}
        <div className="mt-2">
          <h3>Ethics Audit</h3>
          <EthicsIndicators
            riskLevel={ethics.risk_level}
            flags={ethics.bias_flags}
            notes={ethics.fairness_notes}
          />
        </div>

        {/* Actions */}
        <div className="flex mt-2">
          <Link href="/analyze" className="button">
            Run Another Audit
          </Link>

          <a
            href={`/api/report/${requestId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            Export PDF
          </a>
        </div>
      </div>
    </main>
  );
}
