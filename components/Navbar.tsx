/*
==================================================
File Name:    Navbar.tsx
Purpose:      Global navigation bar with
              authentication-aware links.
==================================================
*/

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/db/supabase.browser";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /* --------------------------------------------
     Auth state tracking
  -------------------------------------------- */
  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    // Initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* --------------------------------------------
     Close menu on outside click
  -------------------------------------------- */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* --------------------------------------------
     Logout
  -------------------------------------------- */
  async function handleLogout() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
    router.push("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner" ref={menuRef}>
        {/* MOBILE MENU BUTTON */}
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* NAV LINKS */}
        <div className={`navbar-links ${open ? "open" : ""}`}>
          <Link href="/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/analyze" className="nav-link" onClick={() => setOpen(false)}>
            Analyze
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="nav-link nav-accent"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <button
              className="nav-link-button nav-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
