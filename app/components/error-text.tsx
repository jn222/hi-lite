import classNames from "classnames"
import { type FC } from "react"

interface Props {
  error?: string
  className?: string
}

const ErrorText: FC<Props> = ({ error, className }: Props) => {
  return (
    <>
      {error && (
        <p className={classNames("text-lg text-red-400 my-5", className)}>{error}</p>
      )}
    </>
  )
}

export default ErrorText
