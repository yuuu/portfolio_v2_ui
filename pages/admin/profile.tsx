import React from 'react'
import Layout from '../../components/Layout'
import Header from '../../components/Haeder'
import ProfileForm from '../../components/forms/ProfileForm'
import LinkButton from '../../components/LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../lib/next-hook-auth'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import axios from '../../lib/axios'
import useSWR, { mutate } from 'swr'

const Profile: React.FC = () => {
  const { currentUser, loading } = useAuth(true)
  const fetcher = () => axios.get('/profiles/1').then((res) => res.data)
  const { data, error } = useSWR('/profiles/1', fetcher)

  const router = useRouter()
  const { addToast } = useToasts()

  const onSubmit = async (data) => {
    try {
      await axios.put('/profiles/1', data)
      mutate('/profiles/1')
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/profile')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }
  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading} error={error}>
      <Header title="Edit Profile" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/profile">Back</LinkButton>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-none flex justify-center">
          <img
            src="/images/profile.png"
            className="max-h-80 max-w-xs md:max-h-96 md:max-w-sm mb-4 shadow"
          />
        </div>
        <div className="md:flex-grow">
          <h1 className="text-4xl leading-tight text-gray-900 pb-2 mb-4 border-b-2">
            岡嵜 雄平{' '}
            <span className="text-xl text-gray-500">Okazaki Yuhei</span>
          </h1>
          <div className="flex flex-row justify-start mb-4 space-x-4">
            <a
              href="https://github.com/yuuu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://twitter.com/Y_uuu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://www.facebook.com/yuhei.okazaki/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>
          <ProfileForm profile={data} onSubmit={onSubmit} onError={onError} />
        </div>
      </div>
    </Layout>
  )
}

export default Profile
