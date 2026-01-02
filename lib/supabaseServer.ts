// ==========================================
// File Name:    supabase.ts
// Created By:   Jamie Coker
// Purpose:      Initializes Supabase client for
//               both server and client usage.
// ==========================================

import { createClient } from "@supabase/supabase-js"

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
