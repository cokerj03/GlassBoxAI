// ==========================================
// File Name:    UserIntelligenceSnapshot.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Fetches and displays summarized
//               intelligence derived from the
//               user's historical AI usage.
// ==========================================

import { getUser } from "@/lib/auth"
import { supabaseServer } from "@/lib/supabaseServer"

type UserIntelligenceSnapshotRow = {
  target_role: string
  strengths: string[]
  growth_areas: string[]
  avg_confidence: number
}

export default async function UserIntelligenceSnapshot() {
  const user = await getUser()
  if (!user) return null

  const { data } = await supabaseServer
    .from("user_intelligence_snapshots")
    .select("*")
    .eq("user_id", user.id)
    .single<UserIntelligenceSnapshotRow>()

  if (!data) return null

  return (
    <div className="card">
      <h3 className="card-title">🧠 Your AI Profile Snapshot</h3>

      <ul className="mt-4 space-y-2 text-sm">
        <li><strong>Target Role:</strong> {data.target_role}</li>
        <li><strong>Strengths:</strong> {data.strengths.join(", ")}</li>
        <li><strong>Growth Areas:</strong> {data.growth_areas.join(", ")}</li>
        <li><strong>Avg Confidence (30d):</strong> {data.avg_confidence}%</li>
      </ul>
    </div>
  )
}
