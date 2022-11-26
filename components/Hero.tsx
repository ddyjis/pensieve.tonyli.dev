import Image from 'next/image'

import Logo from 'public/pensieve.png'

export default function Hero() {
  return (
    <div className="hero">
      <Image className="hero__logo" src={Logo} alt="Pensieve Logo" width="96" height="96" />
      <h1 className="hero__title">Pensieve</h1>
    </div>
  )
}
