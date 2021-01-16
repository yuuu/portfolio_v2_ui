import React from 'react'
import Header from '../components/Haeder'

export const Home: React.FC = () => {
  return (
    <>
      <Header title="Profile" />
      <div className="border-4 my-4 border-dashed border-gray-200 rounded-lg h-96"></div>
    </>
  )
}

export default Home
