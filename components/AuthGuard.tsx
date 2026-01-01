/*
==================================================
File Name:    AuthGuard.tsx
Purpose:      Client-side auth protection wrapper
              for protected routes.
==================================================
*/

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
    router.replace("/login?reason=auth");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <main className="page-narrow">
        <div className="card">
          <h3>Checking authentication…</h3>
          <p className="opacity-muted">Please wait.</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
