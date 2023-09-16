"use client"

import classNames from "classnames"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import GrowWrapper from "./grow-wrapper"

const pages = ["Highlights"]
const settings = ["Profile", "Logout"]

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <GrowWrapper>
              <Link
                href="/"
                className="flex items-center py-5 px-2 hover:opacity-80 active:opacity-70"
              >
                <Image
                  src="/icon.png"
                  width={30}
                  height={30}
                  alt=""
                  className="mr-2"
                />
                <span className="font-bold">hi lite</span>
              </Link>
            </GrowWrapper>

            <div className="hidden md:flex items-center space-x-1">
              <Link href="/highlights" className="py-5 px-3">
                highlights
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/login" className="py-5 px-3">
              login
            </Link>
            <Link href="/signup" className="py-2 px-3">
              signup
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames("mobile-menu", "md:hidden", { hidden: true })}>
        <Link
          href="/highlights"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          highlights
        </Link>
      </div>
    </nav>
  )
}
export default NavigationBar
