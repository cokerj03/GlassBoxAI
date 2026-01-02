// ==========================================
// File Name:    dashboard.ts
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Centralized Supabase queries for
//               GlassBoxAI dashboard widgets.
// Notes:        Keeps components clean and testable.
// ==========================================

import { supabase } from "./supabaseServer"

export async function getUserSnapshot(userId: string) {
  return supabase
    .from("user_intelligence_snapshots")
    .select("*")
    .eq("user_id", userId)
    .single()
}

export async function getConfidenceTimeline(userId: string) {
  return supabase
    .from("ai_confidence_logs")
    .select("confidence_score, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
}

export async function getLatestExplanation(userId: string) {
  return supabase
    .from("ai_explanations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
}

export async function getUserPreferences(userId: string) {
  return supabase
    .from("ai_preferences")
    .select("*")
    .eq("user_id", userId)
    .single()
}

export async function updateUserPreferences(
  userId: string,
  prefs: { tone: number; risk: number; detail: number }
) {
  return supabase
    .from("ai_preferences")
    .upsert({ user_id: userId, ...prefs })
}

export async function getPromptHistory(userId: string) {
  return supabase
    .from("prompt_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
}
