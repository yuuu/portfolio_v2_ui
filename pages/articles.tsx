import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import axios from '../lib/axios'

const Articles: React.FC = () => {
  const { currentUser, signout } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )
  const [articles, setArticles] = useState([])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const res = await axios.get('/articles')
        setArticles(res.data)
      } catch (e) {
        // NOP
      }
    })()
  }, [])

  return (
    <Layout user={currentUser} signout={signout}>
      <Header title="Articles" />
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {articles.map((article) => (
            <div
              className="flex mb-8 md:flex-row flex-col items-center"
              key={article.id}
            >
              <div className="md:w-1/3 mb-2">
                <a
                  href="https://qiita.com/Y_uuu/items/1651b181f06499c5cede"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src={article.image}
                  />
                </a>
              </div>
              <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
                <h3 className="text-xl text-gray-600 font-bold mb-2">
                  {article.publishedAt}
                </h3>
                <a
                  href="https://qiita.com/Y_uuu/items/1651b181f06499c5cede"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                    {article.title}
                  </h1>
                </a>
                <p className="leading-relaxed">{article.body}</p>
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
