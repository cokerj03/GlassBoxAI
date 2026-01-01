"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function ForgotPasswordPage() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReset() {
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h2>Forgot Password</h2>

        {sent ? (
          <p className="risk-low">
            ✅ Password reset email sent to <strong>{email}</strong>
          </p>
        ) : (
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="risk-high mt-1">⚠️ {error}</p>}

            <button className="button mt-2" onClick={handleReset}>
              Send Reset Link
            </button>
          </>
        )}
      </div>
    </main>
  );
}
