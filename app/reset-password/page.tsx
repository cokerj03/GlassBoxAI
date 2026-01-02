"use client"

import { useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { error } = await supabaseClient.auth.updateUser({
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-xl font-semibold">Reset Password</h1>

      {success ? (
        <p className="mt-4 text-sm">
          Your password has been updated. You may now log in.
        </p>
      ) : (
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="New password"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button className="btn-primary w-full">
            Update Password
          </button>
        </form>
      )}
    </div>
  )
}
