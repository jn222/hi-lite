import classNames from "classnames"
import { type ReactNode } from "react"

interface Props {
  onClick?: () => void
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  type?: string
}

const Button = ({
  onClick,
  className = "",
  disabled,
  children,
  type
}: Props): ReactNode => {
  return (
    <button
      className={classNames(
        "bg-transparent text-xl transition ease-in-out duration-300 text-white py-2 px-4 border border-white rounded-lg disabled:opacity-50",
        !disabled && "hover:bg-gray-800 active:bg-gray-600",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
