
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

  if (error) {
    return (
      <main>
        <p className="opacity-muted">⚠️ {error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <p className="opacity-muted">Loading...</p>
      </main>
    );
  }

  const flags: string[] = data.bias_flags ?? [];

  return (
    <main>
      <h1>Ethics Breakdown</h1>

      <div className="card mt-2">
        <p>
          Risk Level:{" "}
          <strong className={`risk-${data.risk_level.toLowerCase()}`}>
            {data.risk_level}
          </strong>
        </p>

        <h3 className="mt-1">Bias Flags</h3>
        {flags.length === 0 ? (
          <p className="opacity-muted">No flags detected.</p>
        ) : (
          <ul>
            {flags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        )}

        <h3 className="mt-1">Fairness Notes</h3>
        <p>{data.fairness_notes}</p>

        <div className="flex mt-2">
          <Link
            href={`/analyze/results?id=${requestId}`}
            className="button button-secondary"
          >
            Back to Results
          </Link>

          <Link href="/analyze" className="button">
            New Audit
          </Link>
        </div>
      </div>
    </main>
  );
}
