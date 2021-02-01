import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Header from '../../components/Haeder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
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
import { useAuth } from '../../lib/next-hook-auth'
import axios from '../../lib/axios'

const Profile: React.FC = () => {
  const { loading, signout, currentUser } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/',
    true
  )
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const res = await axios.put('/administrators/profiles/1', data)
      setProfile(res.data)
    } catch (e) {
      // NOP
    }
  }
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/administrators/profiles/1')
        setProfile(res.data)
      } catch (e) {
        // NOP
      }
    })()
  }, [])

  return loading ? (
    <></>
  ) : (
    <Layout user={currentUser} signout={signout}>
      <Header title="Profile(Admin)" />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-4">
              <span>自己紹介</span>
              <textarea
                name="introduction"
                className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-100"
                rows={3}
                ref={register}
                defaultValue={profile?.introduction}
              />
            </label>
            <label className="block mb-4">
              <span>
                <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" />{' '}
                居住地
              </span>
              <textarea
                name="residence"
                className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-100"
                rows={1}
                ref={register}
                defaultValue={profile?.residence}
              />
            </label>
            <label className="block mb-4">
              <span>
                <FontAwesomeIcon
                  icon={faMapMarker}
                  size="lg"
                  className="mr-2"
                />{' '}
                出身地
              </span>
              <textarea
                name="birthplace"
                className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-100"
                rows={1}
                ref={register}
                defaultValue={profile?.birthplace}
              />
            </label>
            <label className="block mb-4">
              <span>
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  size="lg"
                  className="mr-2"
                />{' '}
                生年月日
              </span>
              <textarea
                name="birthday"
                className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-100"
                rows={1}
                ref={register}
                defaultValue={profile?.birthday}
              />
            </label>
            <label className="block mb-4">
              <span>
                <FontAwesomeIcon icon={faHeart} size="lg" className="mr-2" />{' '}
                趣味
              </span>
              <textarea
                name="hobby"
                className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-100"
                rows={1}
                ref={register}
                defaultValue={profile?.hobby}
              />
            </label>
            <input
              type="submit"
              value="保存"
              className="inline-block px-6 py-2 font-medium leading-6 text-center text-white uppercase transition bg-accent rounded shadow ripple hover:shadow-lg hover:bg-accent focus:outline-none"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
