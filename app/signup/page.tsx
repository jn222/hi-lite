"use client"

import { useState } from "react"
import Button from "../components/button"
import Input from "../components/input"
import Link from "next/link"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  return (
    <main>
      <div className="my-5 text-center">
        <h1 className="text-2xl">Sign up</h1>
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
        <div className="text-center mb-5">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value)
            }}
          />
        </div>
        <div className="text-center mb-5">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <div className="text-center mb-5">
          <Input
            type="password"
            label="Confirm password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <div className="my-5">
          <Button onClick={undefined}>Sign Up</Button>
        </div>
        <Link href="/login">Log in here</Link>
      </div>
    </main>
  )
}

export default Page
