/*
==================================================
File Name:    route.ts
Created On:   12/30/2025
Purpose:      Returns decision, confidence, and
              explanation for a requestId.
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
    .from("ai_results")
    .select("request_id, decision, confidence_score, explanation")
    .eq("request_id", requestId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Results not found" }, { status: 404 });
  }

  return NextResponse.json({
    requestId: data.request_id,
    decision: data.decision,
    confidence_score: data.confidence_score,
    explanation: data.explanation,
  });
}
