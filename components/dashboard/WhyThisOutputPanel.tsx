// ==========================================
// File Name:    WhyThisOutputPanel.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Displays explainability metadata
//               showing how the AI weighed factors.
// ==========================================

import { getUser } from "@/lib/auth"
import { supabaseServer } from "@/lib/supabaseServer"

type Factor = {
  label: string
  weight: number
}

type ExplanationRow = {
  factors: Factor[]
  tradeoff: string
}

export default async function WhyThisOutputPanel() {
  const user = await getUser()
  if (!user) return null

  const { data } = await supabaseServer
    .from("ai_explanations")
    .select("factors, tradeoff")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single<ExplanationRow>()

  if (!data) return null

  return (
    <div className="card">
      <h3 className="card-title">🔍 Why This Output?</h3>

      <div className="space-y-3 mt-4">
        {(data.factors as Factor[]).map((factor) => (
          <div key={factor.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{factor.label}</span>
              <span>{factor.weight}%</span>
            </div>
            <div className="h-2 bg-muted rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{ width: `${factor.weight}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Tradeoff made: {data.tradeoff}
      </p>
    </div>
  )
}
