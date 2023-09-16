"use client"

import { useState } from "react"
import Button from "../components/button"
import Input from "../components/input"
import Link from "next/link"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <main>
      <div className="my-5 text-center">
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
          <Button onClick={undefined}>Login</Button>
        </div>
        <Link
          href="/signup"
          className="text-white hover:text-gray-400 transition ease-in-out duration-300"
        >
          Create an account
        </Link>
      </div>
    </main>
  )
}

export default Page
