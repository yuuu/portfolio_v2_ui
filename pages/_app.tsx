import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastProvider } from 'react-toast-notifications'
import { AuthProvider } from '../lib/next-hook-auth'
import 'tailwindcss/tailwind.css'
import 'react-tippy/dist/tippy.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>yuuu&lsquo;s portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="yuuu's portfolio" />
        <meta property="og:description" content="yuuu's portfolio" />
        <meta name="keywords" content="yuuu portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio.y-uuu.net" />
        <meta
          property="og:image"
          content="https://portfolio.y-uuu.net/images/og_image.png"
        />
        <meta property="og:site_name" content="yuuu's portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Y_uuu" />
        <meta name="twitter:player" content="@Y_uuu" />
      </Head>
      <AuthProvider
        signinPath="/administrators/sign_in"
        signoutPath="/administrators/sign_out"
        currentUserPath="/administrators/me"
        redirectPath="/"
        resourceName="administrator"
      >
        <ToastProvider autoDismiss={true}>
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
