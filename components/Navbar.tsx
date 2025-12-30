/*
==================================================
File Name:    Navbar.tsx
Created On:   12/29/2025
Purpose:      Global navigation bar for GlassBoxAI.
              Provides consistent navigation across
              all pages with responsive behavior.
==================================================
*/

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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
          <Link href="/login" className="nav-link" onClick={() => setOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

