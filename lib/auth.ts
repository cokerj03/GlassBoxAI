// ==========================================
// File Name:    auth.ts
// Created By:   Jamie Coker
// Purpose:      Provides authenticated user
//               access for server components.
// ==========================================

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function getUser() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  const { data } = await supabase.auth.getUser()

  return data.user // may be null — middleware handles redirect
}
