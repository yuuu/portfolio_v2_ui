import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import SigninForm from '../../components/forms/SigninForm'
import { useAuth } from '../../lib/next-hook-auth'
import { useRouter } from 'next/router'

const Signin: React.FC = () => {
  const router = useRouter()
  const { currentUser, signin, loading } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )

  useEffect(() => {
    currentUser && router.push('/')
  })

  return (
    <Layout loading={loading || currentUser}>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/images/logo.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <SigninForm signin={signin} />
        </div>
      </div>
    </Layout>
  )
}

export default Signin
