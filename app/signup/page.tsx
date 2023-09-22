"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SignupForm, { type FormFields } from "./signup-form"
import ErrorText from "../components/error-text"

// TODO validation

const Page = () => {
  const router = useRouter()
  const handleSubmit = async ({ email, name, password }: FormFields) => {
    try {
      setError("")
      // TODO Abstract this, use useSWR or getServerSideProps
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password, display_name: name })
      })

      const response = await res.json()
      if (!res.ok) throw response
      router.push("/")
    } catch (error: any) {
      // TODO display error msg
      console.error(error)
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  // TODO Use better state?
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>("")

  return (
    <main>
      <SignupForm onSubmit={handleSubmit} submitError={error}/>
    </main>
  )
}

export default Page
