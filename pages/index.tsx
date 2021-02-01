import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useAuth } from '../lib/next-hook-auth'

const Home: React.FC = () => {
  const { currentUser, signout } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )

  return (
    <Layout user={currentUser} signout={signout}>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div>
          <h1 className="text-6xl leading-tight text-gray-900 py-4 my-4 border-b-2">
            Welcome to yuuu&lsquo;s portfolio.
          </h1>
          <span className="text-2xl block justify-center mb-8">
            Check out my profile!
          </span>
          <div className="flex justify-center">
            <Link href="/profile">
              <button className="bg-accent hover:bg-accent-dark text-white text-2xl py-2 px-4 w-1/2 tracking-widest rounded block">
                Profile
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/logo.png" />
        </div>
      </div>
    </Layout>
  )
}

export default Home
