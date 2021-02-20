import React from 'react'
import Layout from '../../../../components/Layout'
import Header from '../../../../components/Haeder'
import SkillForm from '../../../../components/forms/SkillForm'
import LinkButton from '../../../../components/LinkButton'
import { useAuth } from '../../../../lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useSkill, useUpdateSkill } from '../../../../lib/client'

const Edit: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const { skill, error } = useSkill(Number(router.query.id))
  const update = useUpdateSkill()

  const onSubmit = async (skill) => {
    try {
      update(Number(router.query.id), skill)
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
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit Skill" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/skills">Back</LinkButton>
      </div>
      <SkillForm skill={skill} onSubmit={onSubmit} onError={onError} />
    </Layout>
  )
}

export default Edit
