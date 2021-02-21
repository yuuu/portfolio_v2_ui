import React from 'react'

type Props = {
  title: string
}

export const Header: React.FC<Props> = (props) => {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {props?.title}
        </h1>
      </div>
    </header>
  )
}

export default Header
