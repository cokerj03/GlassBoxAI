/*
==================================================
File Name:    supabase.server.ts
Created On:   12/30/2025
Purpose:      Lazy, server-safe Supabase client
              for API routes and server actions.
==================================================
*/

import { createClient } from "@supabase/supabase-js";

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // IMPORTANT: do NOT crash during build
    throw new Error("Supabase environment variables not configured");
  }

  return createClient(url, key);
}
