import classNames from "classnames"

interface Props {
  onClick?: () => {}
  className?: string
  variant?: "small" | "large"
}

const Pulse = ({ onClick, className, variant = "small" }: Props) => {
  return (
    <span
      className={classNames(
        "relative flex",
        variant === "small" && "h-3 w-3",
        variant === "large" && "h-6 w-6",
        className
      )}
      onClick={onClick}
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span
        className={classNames(
          "relative inline-flex rounded-full bg-white",
          variant === "small" && "h-3 w-3",
          variant === "large" && "h-6 w-6",
          className
        )}
      ></span>
    </span>
  )
}

export default Pulse
