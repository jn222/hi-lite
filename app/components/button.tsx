import classNames from "classnames"

interface Props {
  onClick?: () => {}
  className?: string
  children?: React.ReactNode
}

const Button = ({ onClick, className = "", children }: Props) => {
  return (
    <button
      className={classNames(
        "bg-transparent text-xl transition ease-in-out duration-300 hover:bg-gray-800 active:bg-gray-600 text-white py-2 px-4 border border-white rounded",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
