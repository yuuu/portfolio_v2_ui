import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
}

const LinkButton: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded">
        {children}
      </button>
    </Link>
  )
}

export default LinkButton
