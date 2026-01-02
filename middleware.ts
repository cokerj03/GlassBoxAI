// ==========================================
// File Name:    middleware.ts
// Created By:   Jamie Coker
// Created On:   2026-01-01
// Purpose:      Protects authenticated routes and
//               redirects unauthenticated users
//               to /login.
// Notes:        Uses Supabase SSR (createServerClient).
// ==========================================

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  // 🔐 Protect dashboard
  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/login"
    return NextResponse.redirect(loginUrl)
  }

  // 🔁 Prevent logged-in users from seeing login page
  if (user && pathname.startsWith("/login")) {
    const dashboardUrl = req.nextUrl.clone()
    dashboardUrl.pathname = "/dashboard"
    return NextResponse.redirect(dashboardUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
