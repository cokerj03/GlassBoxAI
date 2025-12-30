/*
==================================================
File Name:    page.tsx
Created On:   12/29/2025
Purpose:      Submission form to create an AI
              request and run analysis.
==================================================
*/

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzePage() {
  const router = useRouter();

  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);

    try {
      const inputText = `RESUME:\n${resumeText}\n\nJOB:\n${jobText}`;

      // 1) Create request
      const reqRes = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputType: "resume_screening",
          inputText
        })
      });

      const reqData = await reqRes.json();
      if (!reqRes.ok) throw new Error(reqData.error ?? "Failed to create request");

      // 2) Analyze
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: reqData.requestId })
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeRes.ok) throw new Error(analyzeData.error ?? "Failed to analyze request");

      // 3) Route to results (we use requestId as lookup key)
      router.push(`/analyze/results?id=${reqData.requestId}`);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Resume Audit</h1>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3>Resume Text</h3>
          <textarea
            style={textareaStyle}
            rows={14}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste resume text here..."
          />
        </div>

        <div style={cardStyle}>
          <h3>Job Description</h3>
          <textarea
            style={textareaStyle}
            rows={14}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste job description here..."
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
        <button style={btnStyle} onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && <p style={{ marginTop: "1rem" }}>⚠️ {error}</p>}
    </main>
  );
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1rem"
};

const cardStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 12,
  padding: "1rem",
  background: "rgba(255,255,255,0.04)"
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.75rem",
  padding: "0.75rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.2)",
  color: "inherit",
  resize: "vertical"
};

const btnStyle: React.CSSProperties = {
  padding: "0.8rem 1.1rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.12)",
  cursor: "pointer"
};
