

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabaseClient"

export default function AccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login?reason=auth")
      } else {
        setEmail(data.user.email ?? "")
      }
    })
  }, [router])

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold">Account</h1>

      <p className="mt-4 text-sm">
        Signed in as <strong>{email}</strong>
      </p>

      <button
        className="btn-primary mt-6"
        onClick={() => supabaseClient.auth.signOut()}
      >
        Sign out
      </button>
    </div>
  )
}
