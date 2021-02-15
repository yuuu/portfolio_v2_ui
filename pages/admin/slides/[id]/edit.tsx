import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import SlideForm from '../../../../components/forms/SlideForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useSlide, useUpdateSlide } from '../../../../lib/client'

const Edit: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const { slide, error } = useSlide(Number(router.query.id))
  const update = useUpdateSlide()

  const onSubmit = async (slide) => {
    try {
      update(Number(router.query.id), slide)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/slides')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit Slide" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/slides">Back</LinkButton>
      </div>
      <SlideForm slide={slide} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
