/*
==================================================
File Name:    login-client.tsx
Purpose:      Password-based login using Supabase
==================================================
*/

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function LoginClient() {
  const router = useRouter();
  const supabase = getSupabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      router.push("/analyze");
    } catch (e: any) {
      setError(e.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h2>Login</h2>

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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <div className="mt-2">
          <Link href="/forgot-password" className="nav-link">
            Forgot your password?
          </Link>
        </div>

        <p className="opacity-muted mt-2">
          Don’t have an account?{" "}
          <Link href="/signup" className="nav-link">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
