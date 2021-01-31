import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type Props = {
  user?: string
  signout?: () => void
}

export const Layout: React.FC<Props> = ({ user, signout, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Navbar />
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-4">
            <div className="px-4 sm:px-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer user={user} signout={signout} />
    </div>
  )
}

export default Layout
