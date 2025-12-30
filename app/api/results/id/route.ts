/*
==================================================
File Name:    route.ts
Created On:   12/29/2025
Purpose:      Retrieves AI decision results and
              explanations for a specific request.
==================================================
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase.server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("ai_results")
    .select("*")
    .eq("request_id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
