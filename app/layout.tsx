import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import NavigationBar from "./components/navigation-bar/navigation-bar"
import { type FC, type ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "hi-lite",
  description: "track the highlight of your day"
}

const RootLayout: FC<Props> = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
