"use client"

import { type FC, type FormEvent } from "react"
import type React from "react"
import { useState } from "react"
import Button from "../components/button"
import Input from "../components/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ErrorText from "../components/error-text"
import { UserApi } from "../services/user-api/user-api"
import { useUserStore } from "../store/store"

/**
 * Login page
 */

const Page: FC = () => {
  const router = useRouter()
  const { setUser } = useUserStore()
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError("")
    UserApi.login(email, password)
      .then((res) => {
        setUser(res.data)
        router.push("/")
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }

  const [error, setError] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main>
      <form onSubmit={onSubmit} className="my-5 text-center">
        <h1 className="text-2xl">Log in</h1>
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
