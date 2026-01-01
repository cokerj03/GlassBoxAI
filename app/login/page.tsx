/*
==================================================
File Name:    page.tsx
Purpose:      Login page with email verification
              confirmation messaging.
==================================================
*/

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function LoginPage() {

  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [sent, setSent] = useState(false);

  const reason = searchParams.get("reason");

{reason === "auth" && (
  <div className="card mt-2">
    <p className="risk-medium">
      🔒 Please log in to access that page.
    </p>
  </div>
)}


  // Show verification banner
  useEffect(() => {
    if (searchParams.get("verified") === "1") {
      setVerified(true);
    }
  }, [searchParams]);

  async function handleLogin() {
    setError(null);
    setSent(false);

    try {
      const supabase = getSupabaseBrowser();

      if (!supabase) {
        setError("Authentication is temporarily unavailable.");
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw error;

      setSent(true);
    } catch (e: any) {
      setError(e.message ?? "Login failed.");
    }
  }

  return (
    <main className="page-narrow">
      {verified && (
        <div className="card mt-2">
          <p className="risk-low">
            ✅ Your email has been verified. You may now log in.
          </p>
        </div>
      )}

      <div className="card mt-2">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="risk-high mt-1">
            ⚠️ {error}
          </p>
        )}

        {sent && (
          <p className="risk-low mt-1">
            📩 Check your email for the login link.
          </p>
        )}

        <button className="button mt-2" onClick={handleLogin}>
          Send Login Link
        </button>
      </div>

      <p className="opacity-muted mt-2">
        Don’t have an account?{" "}
        <Link href="/signup" className="nav-link">
          Sign up
        </Link>
      </p>
    </main>
  );
}
