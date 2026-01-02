/*
==================================================
File Name:    login-client.tsx
Purpose:      Password-based login using Supabase
==================================================
*/

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabaseClient"

export default function LoginClient() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input w-full"
        placeholder="Email"
      />

      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full"
        placeholder="Password"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
