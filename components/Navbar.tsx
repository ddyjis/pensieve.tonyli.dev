import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  return (
    <nav>
      <NextLink href="/-/tags" className="navbar__item">
        Tags
      </NextLink>
      <NextLink href="/-/hashtags" className="navbar__item">
        Hashtags
      </NextLink>
      <div onClick={() => router.reload()} className="navbar__item">
        Reload
      </div>
      <NextLink href="/-/search" className="navbar__item">
        Search
      </NextLink>
    </nav>
  )
}
