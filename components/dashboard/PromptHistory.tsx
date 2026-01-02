// ==========================================
// File Name:    PromptHistory.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Displays previous prompts and
//               allows re-running or comparison.
// ==========================================

import { getUser } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export default async function PromptHistory() {
  const user = await getUser()

  const { data } = await supabase
    .from("prompt_history")
    .select("id, title, confidence_score")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (!data || data.length === 0) return null

  return (
    <div className="card">
      <h3 className="card-title">🕘 Prompt History</h3>

      <ul className="mt-4 space-y-3">
        {data.map((prompt) => (
          <li
            key={prompt.id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium">{prompt.title}</p>
              <p className="text-xs text-muted-foreground">
                Confidence: {prompt.confidence_score}%
              </p>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary">Re-run</button>
              <button className="btn-outline">Compare</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
