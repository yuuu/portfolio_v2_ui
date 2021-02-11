import React, { useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import ArticleForm from '../../../../components/forms/ArticleForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import axios from '../../../../lib/axios'

const Edit: React.FC = () => {
  const { loading, signout, currentUser } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/',
    true
  )
  const [id, setId] = useState<number>()
  const [article, setArticle] = useState(null)
  const { addToast } = useToasts()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/articles/${id}`, data)
      setArticle(res.data)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/articles')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      setId(Number(router.query.id))
    }
  }, [router])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (!id) return

      try {
        const res = await axios.get(`/articles/${id}`)
        setArticle(res.data)
      } catch (e) {
        // NOP
      }
    })()
  }, [id])

  return (
    <Layout loading={loading} user={currentUser} signout={signout}>
      <Header title="Edit Article" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/articles">Back</LinkButton>
      </div>
      <ArticleForm article={article} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
