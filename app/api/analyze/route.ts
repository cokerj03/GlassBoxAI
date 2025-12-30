/*
==================================================
File Name:    route.ts
Created On:   12/29/2025
Purpose:      Performs AI analysis on an existing
              request using the unified AI
              decision pipeline, generates
              explainable results, and records
              ethics audits.
==================================================
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase.server";

import { runAIDecisionPipeline } from "@/lib/ai/decisionPipeline";

export async function POST(req: Request) {
  const { requestId } = await req.json();

  // 1️⃣ Validate input
  if (!requestId) {
    return NextResponse.json(
      { error: "requestId required" },
      { status: 400 }
    );
  }

  // 2️⃣ Retrieve original request
  const { data: request, error: requestError } = await supabase
    .from("requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (requestError || !request) {
    return NextResponse.json(
      { error: "Request not found" },
      { status: 404 }
    );
  }

  /*
    NOTE:
    For MVP, resume and job text are stored together.
    This will be split into separate fields later.
  */

  // 3️⃣ Run unified AI decision pipeline
  const aiOutput = runAIDecisionPipeline(
    request.input_text,
    request.input_text
  );

  // 4️⃣ Store AI result
  const { data: aiResult, error: resultError } = await supabase
    .from("ai_results")
    .insert({
      request_id: requestId,
      decision: aiOutput.decision,
      confidence_score: aiOutput.confidence,
      explanation: aiOutput.explanation
    })
    .select()
    .single();

  if (resultError) {
    return NextResponse.json(
      { error: "Failed to store AI result" },
      { status: 500 }
    );
  }

  // 5️⃣ Store ethics audit
  await supabase.from("ethics_audit").insert({
    request_id: requestId,
    bias_flags: aiOutput.biasAudit.flags,
    risk_level: aiOutput.biasAudit.riskLevel,
    fairness_notes: aiOutput.biasAudit.notes
  });

  // 6️⃣ Return response
  return NextResponse.json({
    resultId: aiResult.id,
    decision: aiOutput.decision,
    confidence: aiOutput.confidence
  });
}
