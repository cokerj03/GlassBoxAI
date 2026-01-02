// ==========================================
// File Name:    page.tsx
// Created On:   2026-01-01
// Purpose:      Main Dashboard Assembly for GlassBoxAI.
//               This page composes all core transparency,
//               explainability, and user-control widgets into
//               a single cohesive dashboard experience.
// Notes:        Designed for incremental enhancement:
//               - Phase 1: Static + mock data
//               - Phase 2: Supabase-backed data
//               - Phase 3: Animations & advanced insights
// ==========================================

import { getUser } from "@/lib/auth"
import UserIntelligenceSnapshot from "@/components/dashboard/UserIntelligenceSnapshot"
import ConfidenceTimeline from "@/components/dashboard/ConfidenceTimeline"
import WhyThisOutputPanel from "@/components/dashboard/WhyThisOutputPanel"
import PromptHistory from "@/components/dashboard/PromptHistory"
import AISettingsPanel from "@/components/dashboard/AISettingsPanel"

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) return null // ✅ REQUIRED for TS + build

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <UserIntelligenceSnapshot />
        <ConfidenceTimeline />
      </div>

      <WhyThisOutputPanel />

      <div className="grid gap-6 md:grid-cols-2">
        <PromptHistory />
        <AISettingsPanel userId={user.id} />
      </div>
    </section>
  )
}
