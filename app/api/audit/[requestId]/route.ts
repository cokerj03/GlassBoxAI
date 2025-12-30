/*
==================================================
File Name:    route.ts
Created On:   12/30/2025
Purpose:      Returns ethics audit for a requestId
              including risk level and flags.
==================================================
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase.server";


export async function GET(
  _req: Request,
  { params }: { params: { requestId: string } }
) {
  const requestId = params.requestId;

  const { data, error } = await supabase
    .from("ethics_audit")
    .select("request_id, risk_level, bias_flags, fairness_notes")
    .eq("request_id", requestId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  return NextResponse.json({
    requestId: data.request_id,
    risk_level: data.risk_level,
    bias_flags: data.bias_flags ?? [],
    fairness_notes: data.fairness_notes ?? "",
  });
}
