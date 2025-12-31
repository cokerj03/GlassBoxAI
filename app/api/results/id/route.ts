/*
==================================================
File Name:    route.ts
Created On:   12/29/2025
Purpose:      Retrieves AI decision results and
              explanations for a specific request.
==================================================
*/
export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/db/supabase.server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {

    const supabase = getSupabaseServer();
    
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
