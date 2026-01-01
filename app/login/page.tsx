/*
==================================================
File Name:    page.tsx
Purpose:      Login page wrapper with Suspense
==================================================
*/

import { Suspense } from "react";
import LoginClient from "./login-client";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-loading">Loading login…</div>}>
      <LoginClient />
    </Suspense>
  );
}


