/*
==================================================
File Name:    signup-client.tsx
Purpose:      Client-side signup logic using Supabase
==================================================
*/

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function SignupClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [needsVerification, setNeedsVerification] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setError(null);
    setResent(false);

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Authentication is temporarily unavailable.");
      setLoading(false);
      return;
    }

    try {
      const origin =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/login?verified=1`,
        },
      });

      if (error) throw error;

      // Email confirmation enabled → session is null
      if (!data.session) {
        setNeedsVerification(true);
        return;
      }

      // If confirmations are disabled
      router.push("/analyze");
    } catch (e: any) {
      setError(e?.message ?? "Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  async function resendVerification() {
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Authentication is temporarily unavailable.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) throw error;
      setResent(true);
    } catch (e: any) {
      setError(e?.message ?? "Could not resend verification email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h1>Create an Account</h1>
        <p className="opacity-muted">
          Sign up to run audits and view your history.
        </p>

        {needsVerification ? (
          <>
            <p className="risk-low mt-1">
              ✅ Account created. Please check <strong>{email}</strong> for a
              verification link.
            </p>

            {resent && (
              <p className="opacity-muted mt-1">
                Verification email resent.
              </p>
            )}

            {error && (
              <p className="risk-high mt-1">
                ⚠️ {error}
              </p>
            )}

            <button
              className="button mt-2"
              onClick={resendVerification}
              disabled={loading}
            >
              {loading ? "Resending…" : "Resend Verification Email"}
            </button>

            <p className="opacity-muted mt-2">
              Already verified?{" "}
              <Link href="/login" className="nav-link">
                Log in
              </Link>
            </p>
          </>
        ) : (
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <p className="risk-high mt-1">
                ⚠️ {error}
              </p>
            )}

            <button
              className="button mt-2"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>

            <p className="opacity-muted mt-2">
              Already have an account?{" "}
              <Link href="/login" className="nav-link">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
