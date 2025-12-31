/*
==================================================
File Name:    EthicsIndicators.tsx
Created On:   12/29/2025
Purpose:      Displays ethics risk indicators,
              bias flags, and severity level.
==================================================
*/

type EthicsIndicatorsProps = {
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  flags: string[];
  notes?: string;
};

export default function EthicsIndicators({
  riskLevel,
  flags,
  notes
}: EthicsIndicatorsProps) {
  return (
    <div className="card mt-1">
      <p>
        Risk Level:{" "}
        <strong className={`risk-${riskLevel.toLowerCase()}`}>
          {riskLevel}
        </strong>
      </p>

      <h4 className="mt-1">Bias Flags</h4>
      {flags.length === 0 ? (
        <p className="opacity-muted">No bias flags detected.</p>
      ) : (
        <ul>
          {flags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      )}

      {notes && (
        <>
          <h4 className="mt-1">Notes</h4>
          <p className="opacity-muted">{notes}</p>
        </>
      )}
    </div>
  );
}
