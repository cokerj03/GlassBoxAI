/*
==================================================
File Name:    page.tsx
Created On:   12/29/2025
Purpose:      Provides login/signup UI using
              Supabase authentication.
==================================================
*/

"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      const supabase = getSupabaseBrowser(); // ✅ created at runtime ONLY

      const { error } = await supabase.auth.signInWithOtp({
        email
      });

      if (error) throw error;
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Send Login Link
        </button>

        {error && <p className="error-text">{error}</p>}
      </div>
    </main>
  );
}
