import React from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { SigninParams } from '../../lib/next-hook-auth'

type Props = {
  signin: (SigninParams) => void
}

const SigninForm: React.FC<Props> = ({ signin }) => {
  const { register, handleSubmit, errors } = useForm()
  const { addToast } = useToasts()

  const onSubmit = async (params: SigninParams) => {
    try {
      await signin(params)
      addToast('Sign in Successfully', { appearance: 'success' })
    } catch (e) {
      addToast('Please reconfirm your input', { appearance: 'error' })
    }
  }
  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            ref={register({ required: true })}
          />
          {errors.emailRequired && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.passwordRequired && <span>This field is required</span>}
        </div>
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
      </div> */}

      <div>
        <button
          type="submit"
          className="w-full py-2 px-6 rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:ring-2"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SigninForm
