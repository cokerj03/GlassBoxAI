/*
==================================================
File Name:    supabase.server.ts
Created On:   12/30/2025
Purpose:      Supabase server-side client for
              API routes and backend logic.
              Uses service role key.
==================================================
*/

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
