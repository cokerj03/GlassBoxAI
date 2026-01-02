
"use client"

import { useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { error } =
      await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-xl font-semibold">Forgot Password</h1>

      {success ? (
        <p className="mt-4 text-sm">
          Check your email for a password reset link.
        </p>
      ) : (
        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="you@example.com"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button className="btn-primary w-full">Send reset link</button>
        </form>
      )}
    </div>
  )
}
