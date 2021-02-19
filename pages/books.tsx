import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import { Book } from '../lib/client'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/books`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { books: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const Books: NextPage<{ books: Book[]; generatedAt: string }> = ({
  books,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout signedin={!!currentUser} loading={!books} generatedAt={generatedAt}>
      <Header title="Books" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/books/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex mb-8 md:flex-row w-full flex-col items-center"
            >
              <div className="md:w-1/4">
                <a href={book.link} target="_blank" rel="noreferrer">
                  <img
                    className="object-cover object-center rounded"
                    alt={book.title}
                    src={book.image}
                  />
                </a>
              </div>
              <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left mt-4">
                <a href={book.link} target="_blank" rel="noreferrer">
                  <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                    {book.title}
                  </h1>
                </a>
                <p className="mb-2 leading-relaxed">{book.description}</p>
                {currentUser && (
                  <div className="flex flex-row justify-end mt-4 mb-4">
                    <LinkButton href={`/admin/books/${book.id}/edit`}>
                      Edit
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Books
