import classNames from "classnames"

interface Props {
  error?: string
  className?: string
}

const ErrorText = ({ error, className }: Props) => {
  return (
    <>
      {error && (
        <p className={classNames("text-lg text-red-400 my-5", className)}>{error}</p>
      )}
    </>
  )
}

export default ErrorText
