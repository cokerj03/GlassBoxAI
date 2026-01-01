/*
==================================================
File Name:    Navbar.tsx
Purpose:      Global navigation bar with
              authentication-aware links.
==================================================
*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowser();

    // ✅ HARD GUARD — prevents crash
    if (!supabase) {
      setReady(true);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setReady(true);
    });
  }, []);

  // Optional: avoid flicker
  if (!ready) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        

        <div className="navbar-links">
          <Link href="/analyze" className="nav-link">
            Analyze
          </Link>

          {user ? (
            <>
              <Link href="/account" className="nav-link">
                {user.email?.split("@")[0]}
              </Link>

              <button
                className="nav-link-button"
                onClick={async () => {
                  const supabase = getSupabaseBrowser();
                  if (supabase) {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">
                Login
              </Link>
              <Link href="/signup" className="nav-link nav-accent">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
