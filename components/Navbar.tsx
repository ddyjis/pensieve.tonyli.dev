import { type Icon, Hash, History, RefreshCcw, Search, Tags } from 'lucide-react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface NavbarItemProps {
  icon: Icon
  href: string
  onClick?: () => void
}

const NavbarItem = ({ icon: IconComponent, href, onClick }: NavbarItemProps) => {
  return (
    <NextLink href={href} className="navbar__item" onClick={onClick}>
      <IconComponent size={32} />
    </NextLink>
  )
}

export default function Navbar() {
  const router = useRouter()
  return (
    <nav>
      <NavbarItem icon={Tags} href="/-/tags" />
      <NavbarItem icon={Hash} href="/-/hashtags" />
      <NavbarItem icon={RefreshCcw} href="#" onClick={() => router.reload()} />
      <NavbarItem icon={History} href="/" />
      <NavbarItem icon={Search} href="/-/search" />
    </nav>
  )
}
