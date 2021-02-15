import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import { useSignout } from '../lib/next-hook-auth'

type Props = {
  signedin: boolean
  generatedAt?: string
}

export const Footer: React.FC<Props> = ({ signedin, generatedAt }) => {
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
        <div className="flex items-center justify-between h-14">
          <p className="flex flex-col text-white sm:py-2">
            <span className="text-xs">
              Copyright © 2021 yuuu. All Rights Reserved.
            </span>
            <span className="text-xs">
              {generatedAt && `generated at ${generatedAt}`}
            </span>
          </p>
          <span className="inline-flex flex-col sm:ml-auto justify-end">
            {signedin ? (
              <button
                className="text-sm text-white text-right"
                onClick={onClick}
              >
                Signout
              </button>
            ) : (
              <Link href="/admin/signin">
                <a className="text-sm text-white text-right">Signin</a>
              </Link>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
