/*
==================================================
File Name:    supabaseBrowser.ts
Created On:   12/30/2025
Purpose:      Supabase client for browser-side
              authentication and client components.
==================================================
*/

import { createClient } from "@supabase/supabase-js";

export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
