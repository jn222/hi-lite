import classNames from "classnames"
import { type FC } from "react"

interface Props {
  className?: string
  expanded?: boolean
  onClick: () => void
}

/** Stylized hamburger button with animations */

const HamburgerButton: FC<Props> = ({
  className,
  expanded,
  onClick
}: Props) => {
  const hamburgerLine =
    "h-1 w-6 my-1 rounded bg-white transition transform duration-300 ease-in-out"

  return (
    <button
      className={classNames(
        "h-12 w-12 flex flex-col justify-center items-center hover:opacity-80 active:opacity-60 transition ease-in-out duration-300",
        className
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          hamburgerLine,
          expanded && "rotate-45 translate-y-3"
        )}
      />
      <div className={classNames(hamburgerLine, expanded && "opacity-0")} />
      <div
        className={classNames(
          hamburgerLine,
          expanded && "-rotate-45 -translate-y-3"
        )}
      />
    </button>
  )
}

export default HamburgerButton
