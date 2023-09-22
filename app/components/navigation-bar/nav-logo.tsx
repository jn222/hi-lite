import Link from "next/link"
import GrowWrapper from "../grow-wrapper"
import Image from "next/image"

const NavLogo = () => {
  return (
    <GrowWrapper>
      <Link
        href="/"
        className="flex items-center py-5 px-2 hover:opacity-80 active:opacity-70"
      >
        <Image src="/icon.png" width={30} height={30} alt="" className="mr-2" />
        <span className="font-bold">hi lite</span>
      </Link>
    </GrowWrapper>
  )
}

export default NavLogo
