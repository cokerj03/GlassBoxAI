/*
==================================================
File Name:    login-client.tsx
Purpose:      Client-side login + verification banner
==================================================
*/

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function LoginClient() {
  const supabase = getSupabaseBrowser();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("verified") === "1") {
      setVerified(true);
    }
    setReason(searchParams.get("reason"));
  }, [searchParams]);

  async function handleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
    } catch (e: any) {
      setError(e.message ?? "Login failed");
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

      {reason === "auth" && (
        <div className="card mt-2">
          <p className="risk-medium">
            🔒 Please log in to access that page.
          </p>
        </div>
      )}

      <div className="card mt-2">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="button mt-2" onClick={handleLogin}>
          Send Login Link
        </button>

        {error && <p className="risk-high mt-1">⚠️ {error}</p>}
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
