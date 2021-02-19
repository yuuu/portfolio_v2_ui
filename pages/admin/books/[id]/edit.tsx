import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import BookForm from '../../../../components/forms/BookForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useBook, useUpdateBook } from '../../../../lib/client'

const Edit: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const { book, error } = useBook(Number(router.query.id))
  const update = useUpdateBook()

  const onSubmit = async (book) => {
    try {
      update(Number(router.query.id), book)
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
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit Book" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/books">Back</LinkButton>
      </div>
      <BookForm book={book} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
