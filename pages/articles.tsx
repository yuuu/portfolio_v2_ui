import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import { Article } from '../lib/client'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/articles`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { articles: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const Articles: NextPage<{ articles: Article[]; generatedAt: string }> = ({
  articles,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout
      signedin={!!currentUser}
      loading={!articles}
      generatedAt={generatedAt}
    >
      <Header title="Articles" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-8">
          <LinkButton href="/admin/articles/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {articles?.map((article) => (
            <div
              className="flex mb-16 md:flex-row w-full flex-col items-center"
              key={article.id}
            >
              <div className="md:w-1/3 mb-4">
                <a href={article.link} target="_blank" rel="noreferrer">
                  <img
                    className="object-cover object-center rounded"
                    alt={article.title}
                    src={article.image}
                  />
                </a>
              </div>
              <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
                <h3 className="text-xl text-gray-600 font-bold mb-2">
                  {article.publishedAt}
                </h3>
                <a href={article.link} target="_blank" rel="noreferrer">
                  <h2 className="title-font text-2xl mb-4 font-medium text-gray-900 break-all">
                    {article.title}
                  </h2>
                </a>
                <p className="leading-relaxed break-all">{article.body}</p>
                {currentUser && (
                  <div className="flex flex-row justify-end mt-4 mb-4">
                    <LinkButton href={`/admin/articles/${article.id}/edit`}>
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

export default Articles
