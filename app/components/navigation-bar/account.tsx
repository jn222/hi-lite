import classNames from "classnames"
import Link from "next/link"

interface Props {
  displayName?: string
  onLogout: () => void
  className: string // Applies to each individual element
}

const Account = ({ displayName, onLogout, className }: Props) => {
  return displayName ? (
    // TODO account image
    <>
      <span className={className}>Hey, {displayName}</span>
      <a onClick={onLogout} className={classNames("cursor-pointer")}>
        Logout
      </a>
    </>
  ) : (
    <>
      <Link href="/login" className={className}>
        Login
      </Link>
      <Link href="/signup" className={className}>
        Signup
      </Link>
    </>
  )
}

export default Account
