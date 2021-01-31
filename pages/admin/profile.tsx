import React from 'react'
import Layout from '../../components/Layout'
import Header from '../../components/Haeder'
import { useAuth } from '../../lib/next-hook-auth'

const Profile: React.FC = () => {
  const { loading, signout, currentUser } = useAuth(
    '/admin/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/',
    true
  )

  return loading ? (
    <></>
  ) : (
    <Layout user={currentUser} signout={signout}>
      <Header title="Profile(Admin)" />
    </Layout>
  )
}

export default Profile
