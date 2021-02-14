import React from 'react'
import Layout from '../../../components/Layout'
import Header from '../../../components/Haeder'
import ArticleForm from '../../../components/forms/ArticleForm'
import LinkButton from '../../../components/LinkButton'
import { useAuth } from '../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useCreateArticle } from '../../../lib/client'

const New: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const update = useCreateArticle()

  const onSubmit = async (article) => {
    try {
      update(article)
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
    <Layout signedin={!!currentUser} loading={loading}>
      <Header title="New Article" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/articles">Back</LinkButton>
      </div>
      <ArticleForm onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default New
