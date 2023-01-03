import type { ReactNode } from 'react'

import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="nav__wrapper">
        <Navbar />
      </div>
      <div className="content">{children}</div>
    </div>
  )
}
