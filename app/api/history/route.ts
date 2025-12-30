/*
==================================================
File Name:    route.ts
Created On:   12/30/2025
Purpose:      Returns a logged-in user's recent
              audit requests for history display.
==================================================
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase.server";

export async function GET() {
  // NOTE: This assumes your server client can read auth
  // If not, we can switch to a cookie-based Supabase server client next.
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("requests")
    .select("id, created_at, input_type")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
