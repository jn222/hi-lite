"use client"

import { type FC, useState } from "react"
import { useRouter } from "next/navigation"
import SignupForm, { type FormFields } from "./signup-form"
import { UserApi } from "../services/user-api/user-api"
import { useUserStore } from "../store/store"

const Page: FC = () => {
  const router = useRouter()
  const { setUser } = useUserStore()
  const [error, setError] = useState<string>("")

  const handleSubmit = (userInfo: FormFields): void => {
    const { name, email, password } = userInfo
    UserApi.signup(name, email, password)
      .then((res) => {
        setUser(res.data)
        router.push("/")
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }

  return (
    <main>
      <SignupForm onSubmit={handleSubmit} submitError={error} />
    </main>
  )
}

export default Page
