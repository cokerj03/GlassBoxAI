/*
==================================================
File Name:    EthicsIndicators.tsx
Created On:   12/30/2025
Purpose:      Displays ethics risk indicators,
              bias flags with severity icons,
              and audit-friendly summaries.
==================================================
*/

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
type Severity = "LOW" | "MEDIUM" | "HIGH";

function inferSeverity(flag: string): Severity {
  const f = flag.toLowerCase();

  // You can refine this list as your bias rules evolve
  if (f.includes("gender") || f.includes("missing data") || f.includes("penalty")) return "HIGH";
  if (f.includes("education") || f.includes("overweight") || f.includes("weighting")) return "MEDIUM";
  return "LOW";
}

function iconForSeverity(sev: Severity) {
  if (sev === "HIGH") return "⛔";
  if (sev === "MEDIUM") return "⚠️";
  return "ℹ️";
}

export default function EthicsIndicators({
  riskLevel,
  flags,
  notes,
}: {
  riskLevel: RiskLevel;
  flags: string[];
  notes?: string;
}) {
  return (
    <div className="ethics-panel">
      <div className={`ethics-risk risk-${riskLevel.toLowerCase()}`}>
        Ethics Risk: <strong>{riskLevel}</strong>
      </div>

      {flags?.length ? (
        <ul className="ethics-flags">
          {flags.map((flag, idx) => {
            const sev = inferSeverity(flag);
            return (
              <li key={idx} className={`flag flag-${sev.toLowerCase()}`}>
                <span className="flag-icon" aria-hidden="true">
                  {iconForSeverity(sev)}
                </span>
                <span className="flag-text">{flag}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="opacity-muted">No significant bias indicators detected.</p>
      )}

      {notes ? <p className="opacity-muted">{notes}</p> : null}
    </div>
  );
}
