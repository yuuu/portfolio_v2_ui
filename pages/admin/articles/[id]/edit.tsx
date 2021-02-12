import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import ArticleForm from '../../../../components/forms/ArticleForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import axios from '../../../../lib/axios'
import useSWR, { mutate } from 'swr'

const Edit: React.FC = () => {
  const { loading, signout, currentUser } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/',
    true
  )
  const { addToast } = useToasts()
  const router = useRouter()

  const fetcher = () =>
    router.query.id
      ? axios.get(`/articles/${router.query.id}`).then((res) => res.data)
      : null
  const { data, error } = useSWR(`/articles/${router.query.id}`, fetcher)

  const onSubmit = async (data) => {
    try {
      await axios.put(`/articles/${router.query.id}`, data)
      mutate(`/articles/${router.query.id}`)
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
    <Layout
      loading={loading || !data}
      error={error}
      user={currentUser}
      signout={signout}
    >
      <Header title="Edit Article" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/articles">Back</LinkButton>
      </div>
      <ArticleForm article={data} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
