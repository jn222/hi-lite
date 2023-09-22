"use client"

import classNames from "classnames"
import { type ReactNode, useState } from "react"
import Link from "next/link"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import NavLogo from "./nav-logo"
import HamburgerButton from "./hamburger-button"
import Account from "./account"

const fetcher = async (path: string) =>
  await fetch(`http://localhost:3001${path}`, { credentials: "include" }).then(
    async (res) => await res.json()
  )

const NavigationBar = (): ReactNode => {
  const router = useRouter()
  // const { user } = useUser()
  // Maybe fetch conditionally?
  let { data: user } = useSWR("/authenticate", fetcher)

  const logout = async (): Promise<void> => {
    try {
      await fetch("http://localhost:3001/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      user = undefined
    } catch (error: any) {
      // TODO display error msg
      console.error(error)
    } finally {
      router.push("/login")
    }
  }

  const [expanded, setExpanded] = useState(false)
  const toggleNav = () => {
    setExpanded(!expanded)
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
              displayName={user?.display_name}
              onLogout={logout}
              className="py-5 px-3"
            />
          </div>

          <div className="md:hidden flex items-center z-50">
            <HamburgerButton expanded={expanded} onClick={toggleNav} />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "top-0 right-0 w-[50vw] bg-gray-500 bg-opacity-80 text-white fixed h-full z-40 ease-in-out duration-300 text-2xl text-center md:hidden py-[10vh]",
          expanded ? "translate-x-0 " : "translate-x-full"
        )}
      >
        <Account
          className="block my-10"
          displayName={user?.display_name}
          onLogout={logout}
        />
        <Link href="/highlights" className="block my-10">
          Highlights
        </Link>
      </div>
    </nav>
  )
}
export default NavigationBar
