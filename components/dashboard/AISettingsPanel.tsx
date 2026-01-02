// ==========================================
// File Name:    AISettingsPanel.tsx
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Allows users to control AI behavior
//               and persist preferences to Supabase.
// ==========================================

"use client"


import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"

type Preferences = {
  tone: number
  risk: number
  detail: number
}

type PreferencesRow = Preferences

export default function AISettingsPanel({ userId }: { userId: string }) {
  const [prefs, setPrefs] = useState<Preferences>({
    tone: 50,
    risk: 50,
    detail: 50,
  })

  useEffect(() => {
    supabaseClient
      .from("ai_preferences")
      .select("*")
      .eq("user_id", userId)
      .single()
      .then(({ data }: { data: PreferencesRow | null }) => {
        if (data) setPrefs(data)
      })
  }, [userId])

  function update(key: keyof Preferences, value: number) {
    setPrefs((prev) => ({ ...prev, [key]: value }))

    supabaseClient
      .from("ai_preferences")
      .update({ [key]: value })
      .eq("user_id", userId)
  }

  return (
    <div className="card">
      <h3 className="card-title">⚙️ AI Settings</h3>

      {(["tone", "risk", "detail"] as (keyof Preferences)[]).map((key) => (
        <div key={key} className="mt-4">
          <label className="text-sm font-medium capitalize">{key}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={prefs[key]}
            onChange={(e) => update(key, Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}
    </div>
  )
}