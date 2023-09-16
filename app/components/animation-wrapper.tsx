"use client"

import { useRouter } from "next/router"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
interface Props {
  children: React.ReactNode
}
const AnimationWrapper = ({ children }: Props) => {
  const router = useRouter()
  const prevScreen = useRef(children)
  const [transitioning, setTransitioning] = useState(false)
  useEffect(() => {
    const handler = () => {
      setTransitioning(true)
      setTimeout(() => {
        // save the current screen as the previous screen.
        prevScreen.current = children
        setTransitioning(false)
      }, 280)
    }
    router.events.on("routeChangeComplete", handler)
    return () => {
      router.events.off("routeChangeComplete", handler)
    }
  }, [children, router.events])

  // determine what screen to display when transitioning
  const Screen = !transitioning ? children : prevScreen.current
  return (
    <div
      className={classNames({
        //use enter animation when showing the current screen
        // "animate-slideUpEnter": !transitioning,
        //use an exit animation when showing the previous screen
        "animate-slide-out": transitioning,
      })}
    >
      {children}
    </div>
  )
}

export default AnimationWrapper
