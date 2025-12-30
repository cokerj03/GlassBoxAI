/*
==================================================
File Name:    route.ts
Created On:   12/29/2025
Purpose:      Accepts and stores user-submitted AI
              decision requests. Acts as the
              immutable input layer for analysis.
==================================================
*/

import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase.server";

export async function POST(req: Request) {
  const { userId, inputType, inputText } = await req.json();

  if (!inputType || !inputText) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("requests")
    .insert({
      user_id: userId ?? null,
      input_type: inputType,
      input_text: inputText
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requestId: data.id });
}
