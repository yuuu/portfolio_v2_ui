import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a>
                  <div className="flex space-x-4">
                    <div className="rounded-full h-8 w-8 bg-white">
                      <img src="/images/logo.png" alt="Workflow"></img>
                    </div>
                    <span className="text-white text-xl">
                      yuuu&lsquo;s portfolio
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Profile</a> */}
              {[
                ['Profile', '/profile'],
                ['Apps', '/apps'],
                ['Books', '/books'],
                ['Articles', '/articles'],
                ['Slides', '/slides'],
                ['Skills', '/skills'],
              ].map(([name, path]) => (
                <Link key={name} href={path}>
                  <a
                    className={`text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
                      router.pathname == path && 'bg-gray-700'
                    }`}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${menu ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Profile</a> */}
          {[
            ['Profile', '/profile'],
            ['Apps', '/apps'],
            ['Books', '/books'],
            ['Articles', '/articles'],
            ['Slides', '/slides'],
            ['Skills', '/skills'],
          ].map(([name, path]) => (
            <Link key={name} href={path}>
              <a
                className={`text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname == path && 'bg-gray-700'
                }`}
              >
                {name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
