import classNames from "classnames"

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const GrowWrapper = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={classNames(
        "ease-in-out duration-500 hover:scale-125 active:scale-110 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default GrowWrapper
