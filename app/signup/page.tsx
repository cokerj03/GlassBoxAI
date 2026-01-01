/*
==================================================
File Name:    page.tsx
Purpose:      Signup page wrapper (Server Component)
==================================================
*/

import { Suspense } from "react";
import SignupClient from "./signup-client";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="page-loading">Loading signup…</div>}>
      <SignupClient />
    </Suspense>
  );
}
