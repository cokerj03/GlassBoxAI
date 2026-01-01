"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function AccountPage() {
  const supabase = getSupabaseBrowser();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login?reason=auth");
      else setEmail(data.user.email);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="page-narrow">
      <div className="card">
        <h2>Account</h2>

        <p className="opacity-muted mt-1">
          Signed in as <strong>{email}</strong>
        </p>

        <button className="button mt-2" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </main>
  );
}
