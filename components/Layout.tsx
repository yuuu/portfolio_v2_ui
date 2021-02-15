import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HashLoader from 'react-spinners/HashLoader'

type Props = {
  loading?: boolean
  error?: boolean
  signedin: boolean
  generatedAt?: string
}

const AlertMessage: React.FC = () => (
  <div className="flex justify-start items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 ">
    <div slot="avatar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-alert-octagon w-5 h-5 mx-2"
      >
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <div className="text-xl font-normal  max-w-full flex-initial">
      There is an error.
    </div>
  </div>
)

export const Layout: React.FC<Props> = ({
  loading,
  error,
  signedin,
  generatedAt,
  children,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center px-4 mt-20 sm:px-6 lg:px-8 pt-8">
        <HashLoader size={100} color="#eb4366" />
      </div>
    )
  } else if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Navbar />
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-4">
              <div className="px-4 sm:px-0">
                <AlertMessage />
              </div>
            </div>
          </div>
        </main>
        <Footer signedin={signedin} />
      </div>
    )
  } else {
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
        <Footer signedin={signedin} generatedAt={generatedAt} />
      </div>
    )
  }
}

export default Layout
