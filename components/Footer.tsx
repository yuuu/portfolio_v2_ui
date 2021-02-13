import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import { useSignout } from '../lib/next-hook-auth'

type Props = {
  signedin: boolean
}

export const Footer: React.FC<Props> = ({ signedin }) => {
  const router = useRouter()
  const { addToast } = useToasts()
  const signout = useSignout()

  const onClick = async () => {
    await signout()
    addToast('Sign out Successfully', { appearance: 'success' })
    router.push('/')
  }

  return (
    <footer className="bg-gray-800 body-font">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <p className="text-sm text-white sm:py-2">
            Copyright © 2021 yuuu. All Rights Reserved.
          </p>
          <span className="inline-flex sm:ml-auto justify-center sm:justify-start">
            {signedin ? (
              <button className="ml-3 text-sm text-white" onClick={onClick}>
                Signout
              </button>
            ) : (
              <Link href="/admin/signin">
                <a className="ml-3 text-sm text-white">Signin</a>
              </Link>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
