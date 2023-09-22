"use client"

import { type FormEvent } from "react"
import type React from "react"
import { useState } from "react"
import Button from "../components/button"
import Input from "../components/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ErrorText from "../components/error-text"

const Page = () => {
  const router = useRouter()
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setError("")
      // TODO Abstract this, use useSWR or getServerSideProps
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      const response = await res.json()
      if (!res.ok) throw response
      router.push("/")
    } catch (error: any) {
      // TODO display error msg
      console.error(error)
      setError(error.message)
    }
  }

  const [error, setError] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main>
      <form onSubmit={onSubmit} className="my-5 text-center">
        <h1 className="text-2xl">Log in</h1>
        {/* TODO Fix widths */}
        <div className="text-center my-5">
          <Input
            type="text"
            label="Email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div className="text-center">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <div className="my-5">
          <Button type="submit" disabled={email === "" || password === ""}>
            Submit
          </Button>
        </div>
        <ErrorText error={error} />
        <Link
          href="/signup"
          className="text-white hover:text-gray-400 transition ease-in-out duration-300"
        >
          Create an account
        </Link>
      </form>
    </main>
  )
}

export default Page
