import Image from 'next/image'

import Logo from 'public/pensieve.png'

const Banner = () => {
  return (
    <div className="banner">
      <Image className="banner__logo" src={Logo} alt="Pensieve Logo" width="96" height="96" />
      <h1 className="banner__title">Pensieve</h1>
    </div>
  )
}

export default Banner
