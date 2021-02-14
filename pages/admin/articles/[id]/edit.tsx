import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import ArticleForm from '../../../../components/forms/ArticleForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useArticle, useUpdateArticle } from '../../../../lib/client'

const Edit: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const { article, error } = useArticle(Number(router.query.id))
  const update = useUpdateArticle()

  const onSubmit = async (article) => {
    try {
      update(Number(router.query.id), article)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/articles')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit Article" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/articles">Back</LinkButton>
      </div>
      <ArticleForm article={article} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
