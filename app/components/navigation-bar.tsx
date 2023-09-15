"use client"

import classNames from "classnames"
import { useState, MouseEvent } from "react"

const pages = ["Highlights"]
const settings = ["Profile", "Logout"]

const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <nav>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="/"
                className="flex items-center py-5 px-2 text-white-700 hover:text-white-900"
              >
                {/* <svg
                  className="h-6 w-6 mr-1 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg> */}
                <span className="font-bold">hi lite</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a
                href="/highlights"
                className="py-5 px-3 text-white hover:text-gray-300"
              >
                highlights
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a href="/login" className="py-5 px-3">
              login
            </a>
            <a
              href=""
              className="py-2 px-3 bg-sky-400 hover:bg-sky-300 text-sky-900 hover:text-sky-800 rounded transition duration-300"
            >
              signup
            </a>
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
        <a
          href="/highlights"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          highlights
        </a>
      </div>
    </nav>
  )
}
export default NavigationBar
