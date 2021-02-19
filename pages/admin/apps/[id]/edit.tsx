import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import AppForm from '../../../../components/forms/AppForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useApp, useUpdateApp } from '../../../../lib/client'

const Edit: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const { app, error } = useApp(Number(router.query.id))
  const update = useUpdateApp()

  const onSubmit = async (app) => {
    try {
      update(Number(router.query.id), app)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/apps')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit App" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/apps">Back</LinkButton>
      </div>
      <AppForm app={app} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
