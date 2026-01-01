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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("Supabase env vars missing");
    return null;
  }

  return createClient(url, key);
}
