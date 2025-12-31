/*
==================================================
File Name:    supabase.browser.ts
Created On:   12/30/2025
Purpose:      Supabase browser client for
              authentication and client-side
              operations.
==================================================
*/

import { createClient } from "@supabase/supabase-js";

export function getSupabaseBrowser() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error("Supabase browser env vars missing");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
