import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import logo from '../public/pensieve.png'

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
      <NextLink href="/" className="navbar__item">
        <NextImage src={logo} alt="Random note" height={32} />
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
