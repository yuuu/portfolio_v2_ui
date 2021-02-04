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

const Profile: React.FC = () => {
  const { loading, signout, currentUser } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/',
    true
  )

  return (
    <Layout loading={loading} user={currentUser} signout={signout}>
      <Header title="Edit Profile" />
      <div className="flex flex-row justify-end mb-4">
        <LinkButton href="/profile">Back</LinkButton>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-none flex justify-center">
          <img
            src="/profile.png"
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
          <ProfileForm />
        </div>
      </div>
    </Layout>
  )
}

export default Profile
