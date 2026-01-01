"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function ResetPasswordPage() {
  const supabase = getSupabaseBrowser();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdate() {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h2>Reset Password</h2>

        {success ? (
          <p className="risk-low">
            ✅ Password updated. Redirecting to login…
          </p>
        ) : (
          <>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="risk-high mt-1">⚠️ {error}</p>}

            <button className="button mt-2" onClick={handleUpdate}>
              Update Password
            </button>
          </>
        )}
      </div>
    </main>
  );
}
