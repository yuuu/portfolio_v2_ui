import React from 'react'
import Layout from '../../../components/Layout'
import Header from '../../../components/Haeder'
import BookForm from '../../../components/forms/BookForm'
import LinkButton from '../../../components/LinkButton'
import { useAuth } from '../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useCreateBook } from '../../../lib/client'

const New: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const create = useCreateBook()

  const onSubmit = async (article) => {
    try {
      create(article)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/books')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading}>
      <Header title="New Book" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/books">Back</LinkButton>
      </div>
      <BookForm onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default New
