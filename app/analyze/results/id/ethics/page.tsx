/*
==================================================
File Name:    page.tsx
Created On:   12/29/2025
Purpose:      Displays ethics audit details,
              including bias flags and risk level.
==================================================
*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EthicsPage({ params }: { params: { id: string } }) {
  const requestId = params.id;

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/audit/${requestId}`);
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Failed to load audit");
      else setData(json);
    })();
  }, [requestId]);

  if (error) return <main style={{ padding: "3rem 1.25rem" }}>⚠️ {error}</main>;
  if (!data) return <main style={{ padding: "3rem 1.25rem" }}>Loading...</main>;

  const flags: string[] = data.bias_flags ?? [];

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Ethics Breakdown</h1>

      <div style={cardStyle}>
        <p>
          Risk Level: <strong>{data.risk_level}</strong>
        </p>

        <h3>Bias Flags</h3>
        {flags.length === 0 ? (
          <p>No flags detected.</p>
        ) : (
          <ul>
            {flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        <h3>Fairness Notes</h3>
        <p style={{ lineHeight: 1.6 }}>{data.fairness_notes}</p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
          <Link href={`/analyze/results?id=${requestId}`} style={btnStyle}>
            Back to Results
          </Link>
          <Link href="/analyze" style={btnStyleSecondary}>
            New Audit
          </Link>
        </div>
      </div>
    </main>
  );
}
