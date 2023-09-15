interface Props {
  onClick?: () => {}
  className?: string
  children?: React.ReactNode
}

const Button = ({ onClick, className = "", children }: Props) => {
  return (
    <button
      className={`bg-transparent transition ease-in-out hover:bg-gray-800 duration-300 text-white py-2 px-4 border border-white rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
