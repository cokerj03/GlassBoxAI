// ==========================================
// File Name:    ConfidenceTimeline.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Visualizes AI confidence trends
//               based on logged outputs.
// ==========================================


import { getUser } from "@/lib/auth"
import { supabaseServer } from "@/lib/supabaseServer"

export default async function ConfidenceTimeline() {
  const user = await getUser()

  // ✅ Explicit guard satisfies TypeScript
  if (!user) return null

  const { data } = await supabaseServer
    .from("ai_confidence_logs")
    .select("confidence_score, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (!data || data.length === 0) return null

  return (
    <div className="card">
      <h3 className="card-title">📈 AI Confidence Timeline</h3>

      <div className="flex items-end gap-3 h-32 mt-6">
        {data.map((entry, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="w-6 bg-primary rounded-t"
              style={{ height: `${entry.confidence_score}%` }}
            />
            <span className="text-xs mt-2">
              {new Date(entry.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
