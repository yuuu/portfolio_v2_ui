import React from 'react'
import Layout from '../../../components/Layout'
import Header from '../../../components/Haeder'
import SkillForm from '../../../components/forms/SkillForm'
import LinkButton from '../../../components/LinkButton'
import { useAuth } from '../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useCreateSkill } from '../../../lib/client'

const New: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const create = useCreateSkill()

  const onSubmit = async (article) => {
    try {
      create(article)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/skills')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading}>
      <Header title="New Skill" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/skills">Back</LinkButton>
      </div>
      <SkillForm onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default New
