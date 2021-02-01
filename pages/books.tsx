import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'

const Books: React.FC = () => {
  const { currentUser, signout } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )

  return (
    <Layout user={currentUser} signout={signout}>
      <Header title="Books" />
      <div className="container mx-auto">
        <div className="flex flex-wrap -m-4">
          {['book1', 'book2'].map((name) => (
            <div
              key={name}
              className="flex px-5 pb-6 md:flex-row flex-col items-center"
            >
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {name}
                </h1>
                <p className="mb-8 leading-relaxed">
                  Copper mug try-hard pitchfork pour-over freegan heirloom
                  neutra air plant cold-pressed tacos poke beard tote bag.
                  Heirloom echo park mlkshk tote bag selvage hot chicken
                  authentic tumeric truffaut hexagon try-hard chambray.
                </p>
                <div className="flex justify-center">
                  <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    Button
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://dummyimage.com/720x600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Books
