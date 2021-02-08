import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'

const Books: React.FC = () => {
  const { currentUser, signout } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )

  const books = [
    {
      title: 'AWSとM5StickCで作るIoT開発入門',
      description:
        '本書は、初めてIoT開発を経験する人向けに、設計・実装・テストの流れを解説した書籍です。IoT開発に必要な技術要素や開発そのものの流れを、読者のみなさまに理解してもらうことを目的に執筆しました。',
      link: 'https://techbookfest.org/product/5189029702139904',
      image: '/images/books/iot_dev_starting_book.png',
    },
    {
      title: '作って学ぶSORACOM入門',
      description:
        '本書はIoT向けの無線通信プラットフォームである「SORACOM」の入門書です。読者の皆様がより簡単にSORACOMを使えるようになることを目的に執筆しました。',
      link: 'https://techbookfest.org/product/5273269798174720',
      image: '/images/books/build_and_learn_soracom_book.png',
    },
  ]

  return (
    <Layout user={currentUser} signout={signout}>
      <Header title="Books" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/books">Edit</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex pb-6 md:flex-row flex-col items-center"
            >
              <div className="md:w-1/4">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src={book.image}
                />
              </div>
              <div className="md:flex-grow md:w-1/2 md:pl-16 flex flex-col items-start text-left mb-16 mt-8">
                <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                  {book.title}
                </h1>
                <p className="mb-8 leading-relaxed">{book.description}</p>
                <div className="flex justify-center">
                  <LinkButton href={book.link}>Buy</LinkButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Books
