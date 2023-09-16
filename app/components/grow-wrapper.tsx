import classNames from "classnames"

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => {}
}

const GrowWrapper = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={classNames(
        "ease-in-out duration-500 hover:scale-110 active:scale-125 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default GrowWrapper
