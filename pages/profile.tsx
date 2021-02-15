import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import LinkButton from '../components/LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faBirthdayCake,
  faHeart,
  faMapMarker,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../lib/next-hook-auth'
import { Profile } from '../lib/client'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/profiles/1`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { profile: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const ProfilePage: NextPage<{ profile: Profile; generatedAt: string }> = ({
  profile,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout
      signedin={!!currentUser}
      loading={!profile}
      generatedAt={generatedAt}
    >
      <Header title="Profile" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/profile">Edit</LinkButton>
        </div>
      )}
      <div className="flex flex-col md:flex-row space-x-4">
        <div className="flex-none flex justify-center">
          <img
            src="/images/profile.png"
            className="max-h-80 max-w-xs md:max-h-96 md:max-w-sm mb-4 shadow"
          />
        </div>
        <div className="flex-grow">
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
          <p className="mb-4">
            {profile?.introduction.split('\n').map((str, index) => (
              <React.Fragment key={index}>
                {str}
                <br />
              </React.Fragment>
            ))}
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr>
                <th className="py-2">
                  <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" />
                </th>
                <th className="py-2 text-left">居住地</th>
                <td>{profile?.residence}</td>
              </tr>
              <tr>
                <th className="py-2">
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    size="lg"
                    className="mr-2"
                  />
                </th>
                <th className="py-2 text-left">出身地</th>
                <td>{profile?.birthplace}</td>
              </tr>
              <tr>
                <th className="py-2">
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    size="lg"
                    className="mr-2"
                  />
                </th>
                <th className="py-2 text-left">生年月日</th>
                <td>{profile?.birthday}</td>
              </tr>
              <tr>
                <th className="py-2">
                  <FontAwesomeIcon icon={faHeart} size="lg" className="mr-2" />
                </th>
                <th className="py-2 text-left">趣味</th>
                <td>{profile?.hobby}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage
