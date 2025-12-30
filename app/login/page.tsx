/*
==================================================
File Name:    page.tsx
Created On:   12/29/2025
Purpose:      Provides login/signup UI using
              Supabase authentication.
==================================================
*/

"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/db/supabaseBrowser";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setStatus(null);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);
    setStatus(error ? error.message : "Logged in successfully.");
  }

  async function handleSignup() {
    setLoading(true);
    setStatus(null);

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password
    });

    setLoading(false);
    setStatus(error ? error.message : "Account created. Check email if confirmation is enabled.");
  }

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Login</h1>

      <div style={cardStyle}>
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />

        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          type="password"
        />

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button style={btnStyle} onClick={handleLogin} disabled={loading}>
            {loading ? "Working..." : "Login"}
          </button>
          <button style={btnStyleSecondary} onClick={handleSignup} disabled={loading}>
            {loading ? "Working..." : "Sign Up"}
          </button>
        </div>

        {status && (
          <p style={{ marginTop: "1rem", opacity: 0.85 }}>
            {status}
          </p>
        )}
      </div>

      <p style={{ marginTop: "1rem", opacity: 0.75 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>Back home</Link>
      </p>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 12,
  padding: "1rem",
  background: "rgba(255,255,255,0.04)"
};

const labelStyle: React.CSSProperties = { display: "block", marginTop: "0.75rem" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  marginTop: "0.35rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.2)",
  color: "inherit"
};

const btnStyle: React.CSSProperties = {
  padding: "0.7rem 1rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.12)",
  cursor: "pointer"
};

const btnStyleSecondary: React.CSSProperties = {
  ...btnStyle,
  background: "transparent"
};
