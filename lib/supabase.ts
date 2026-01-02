// ==========================================
// File Name:    supabase.ts
// Created By:   Jamie Coker
// Purpose:      Initializes Supabase client for
//               both server and client usage.
// ==========================================

import { createClient } from "@supabase/supabase-js"

console.log("ENV CHECK:", {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
})

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
