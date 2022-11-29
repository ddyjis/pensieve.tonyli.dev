import { type Icon, Hash, History, RefreshCcw, Search, Tags } from 'lucide-react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface NavbarItemProps {
  icon: Icon
  label: string
  href: string
  onClick?: () => void
}

const NavbarItem = ({ icon: IconComponent, label, href, onClick }: NavbarItemProps) => {
  return (
    <NextLink href={href} className="navbar__item" onClick={onClick}>
      <IconComponent size={32} />
      <div className="navbar__item__title">{label}</div>
    </NextLink>
  )
}

export default function Navbar() {
  const router = useRouter()
  return (
    <nav>
      <NavbarItem icon={Tags} label="Tags" href="/-/tags" />
      <NavbarItem icon={Hash} label="Label" href="/-/hashtags" />
      <NavbarItem icon={RefreshCcw} label="Refresh" href="#" onClick={() => router.reload()} />
      <NavbarItem icon={History} label="History" href="/" />
      <NavbarItem icon={Search} label="Search" href="/-/search" />
    </nav>
  )
}
