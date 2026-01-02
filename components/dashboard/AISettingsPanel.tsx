// ==========================================
// File Name:    AISettingsPanel.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Allows users to control AI behavior
//               and persist preferences to Supabase.
// ==========================================

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Preferences = {
  tone: number
  risk: number
  detail: number
}

export default function AISettingsPanel({ userId }: { userId: string }) {
  const [prefs, setPrefs] = useState<Preferences>({
    tone: 50,
    risk: 50,
    detail: 50,
  })

  useEffect(() => {
    supabase
      .from("ai_preferences")
      .select("*")
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        if (data) setPrefs(data)
      })
  }, [userId])

  function update(key: keyof Preferences, value: number) {
    setPrefs((prev) => ({ ...prev, [key]: value }))
  }

  async function save() {
    await supabase
      .from("ai_preferences")
      .upsert({ user_id: userId, ...prefs })
  }

  return (
    <div className="card">
      <h3 className="card-title">🎛 AI Preferences</h3>

      {(["tone", "risk", "detail"] as const).map((key) => (
        <div key={key} className="mt-4">
          <label className="text-sm capitalize">{key}</label>
          <input
            type="range"
            value={prefs[key]}
            onChange={(e) => update(key, Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}

      <button onClick={save} className="btn-primary mt-6 w-full">
        Save Preferences
      </button>
    </div>
  )
}
