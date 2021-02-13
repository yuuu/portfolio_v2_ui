import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios'
import useSWR, { mutate } from 'swr'

export type User = {
  id: number
  createdAt: string
  updatedAt: string
}

export const useAuth = (
  currentUserPath,
  signinPath,
  signoutPath,
  redirectPath,
  redirect = false
) => {
  const fetcher = () => axios.get(currentUserPath).then((res) => res.data)
  const { data, error } = useSWR(currentUserPath, fetcher)
  const router = useRouter()

  useEffect(() => {
    if (error && redirect) router.push(redirectPath)
  }, [data, error])

  const signout = async () => {
    await axios.get(currentUserPath)
    await axios.delete(signoutPath)
    await mutate(currentUserPath)
  }

  const signin = async (user: User) => {
    await axios.post(signinPath, { administrator: user })
    await mutate(currentUserPath)
  }

  return {
    currentUser: !error && data,
    loading: !error && !data,
    signin,
    signout,
  }
}
