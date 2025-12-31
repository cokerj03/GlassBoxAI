/*
==================================================
File Name:    route.ts
Created On:   12/30/2025
Purpose:      Returns a logged-in user's recent
              audit requests for history display.
==================================================
*/
export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/db/supabase.server";

export async function GET() {
  // ✅ 1. Create server client FIRST
  const supabase = getSupabaseServer();

  // ✅ 2. Read authenticated user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // ✅ 3. Fetch request history
  const { data, error } = await supabase
    .from("requests")
    .select("id, created_at, input_type")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }

  return NextResponse.json({ history: data });
}
