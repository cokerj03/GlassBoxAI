/*
==================================================
File Name:    page.tsx
Created On:   12/29/2025
Purpose:      Landing page for GlassBoxAI.
==================================================
*/

import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
  return (
    <main>
      <header className="hero-center">
        <Image
          src="/images/glassbox-logo.png"
          alt="GlassBoxAI"
          width={180}
          height={180}
          className="hero-logo"
          priority
        />

        <p className="hero-tagline">
          Transparent AI decision support for resume screening.
          Understand decisions, confidence, and ethical risk — not a black box.
        </p>
      </header>

      <section className="grid grid-2 mt-2">
        <div className="card glass-shine">
          <h3>Explainability</h3>
          <p>Feature-based reasoning signals that you can audit.</p>
        </div>

        <div className="card glass-shine">
          <h3>Ethics Checks</h3>
          <p>Flags gendered language, missing data penalties, and weighting risks.</p>
        </div>

        <div className="card glass-shine">
          <h3>Auditability</h3>
          <p>Inputs, outputs, and ethics stored separately.</p>
        </div>
      </section>

      <section className="flex mt-2">
        <Link href="/analyze" className="button">
          Run Resume Audit
        </Link>
        <Link href="/login" className="button button-secondary">
          Login
        </Link>
      </section>

      <footer className="mt-2 opacity-muted">
        <small>
          GlassBoxAI is assistive and does not make hiring decisions.
        </small>
      </footer>
    </main>
  );
}
