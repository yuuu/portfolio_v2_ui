import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastProvider } from 'react-toast-notifications'
import { AuthProvider } from '../lib/next-hook-auth'
import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>yuuu&lsquo;s portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider
        signinPath="/administrators/sign_in"
        signoutPath="/administrators/sign_out"
        currentUserPath="/administrators/me"
        redirectPath="/"
      >
        <ToastProvider autoDismiss={true}>
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
