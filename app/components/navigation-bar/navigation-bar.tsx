"use client"

import classNames from "classnames"
import { type FC, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NavLogo from "./nav-logo"
import HamburgerButton from "./hamburger-button"
import Account from "./account"
import { UserApi } from "@/app/services/user-api/user-api"
import { useUserStore } from "@/app/store/store"

const NavigationBar: FC = () => {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const { user, setUser } = useUserStore((state) => state)

  useEffect(() => {
    UserApi.authenticate()
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const logout = (): void => {
    UserApi.logout()
      .then((_res) => {
        setUser(undefined)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        router.push("/login")
      })
  }

  return (
    <nav>
      <div className="max-w-6xl mx-auto px-4 text-lg">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <NavLogo />
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/highlights" className="py-5 px-3">
                Highlights
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Account
              name={user?.name}
              onLogout={logout}
              className="py-5 px-3"
            />
          </div>

          <div className="md:hidden flex items-center z-50">
            <HamburgerButton
              expanded={expanded}
              onClick={() => {
                setExpanded(!expanded)
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "top-0 right-0 w-[50vw] bg-gray-500 bg-opacity-80 text-white fixed h-full z-40 ease-in-out duration-300 text-2xl text-center md:hidden py-[10vh]",
          expanded ? "translate-x-0 " : "translate-x-full"
        )}
      >
        <Account className="block my-10" name={user?.name} onLogout={logout} />
        <Link href="/highlights" className="block my-10">
          Highlights
        </Link>
      </div>
    </nav>
  )
}
export default NavigationBar
