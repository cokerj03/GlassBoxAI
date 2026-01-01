"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          background: "#0b0f14",
          color: "#f5f6fa",
          fontFamily: "system-ui",
          padding: "3rem",
        }}
      >
        <h1>Something went wrong</h1>
        <p style={{ opacity: 0.8 }}>{error.message}</p>

        <button
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
