import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HashLoader from 'react-spinners/HashLoader'

type Props = {
  loading?: boolean
  user?: string
  signout?: () => void
}

export const Layout: React.FC<Props> = ({
  loading,
  user,
  signout,
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Navbar />
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-4">
            <div className="px-4 sm:px-0">
              {loading ? (
                <div className="flex justify-center px-4 mt-20 sm:px-6 lg:px-8 pt-8">
                  <HashLoader size={100} color="#eb4366" />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer user={user} signout={signout} />
    </div>
  )
}

export default Layout
