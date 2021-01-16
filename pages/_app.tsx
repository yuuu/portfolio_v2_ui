import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>yuuu&lsquo;s portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow mb-8">
          <Navbar />
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MyApp
