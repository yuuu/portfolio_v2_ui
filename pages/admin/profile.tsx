import React from 'react'
import Header from '../../components/Haeder'
import { useAuth } from '../../lib/next-hook-auth'

const Profile: React.FC = () => {
  const { loading } = useAuth('/admin/me', '/')

  return loading ? (
    <></>
  ) : (
    <>
      <Header title="Profile(Admin)" />
    </>
  )
}

export default Profile
