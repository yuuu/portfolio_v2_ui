import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios'

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
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await axios.get(currentUserPath)
        setCurrentUser(res.data)
        setLoading(false)
      } catch (e) {
        if (redirect) {
          router.push(redirectPath)
        } else {
          setCurrentUser(null)
          setLoading(false)
        }
      }
    })()
  }, [])

  const signout = async () => {
    try {
      await axios.get(currentUserPath)
      await axios.delete(signoutPath)
    } catch (e) {
      // NOP
    }
    if (redirect) {
      router.push(redirectPath)
    } else {
      setCurrentUser(null)
      setLoading(false)
    }
  }

  const signin = async (user) => {
    await axios.post(signinPath, { administrator: user })

    const res = await axios.get(currentUserPath)
    setCurrentUser(res.data)
  }

  return { currentUser, signin, signout, loading } // 呼び出し元のコンポーネントだとcurrentUserがnull
}
