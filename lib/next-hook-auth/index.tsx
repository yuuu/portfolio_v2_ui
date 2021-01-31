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
  1
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
      setCurrentUser(null)
      setLoading(false)
    } catch (e) {
      // NOP
    }
  }

  const signin = async (user) => {
    try {
      await axios.post(signinPath, { administrator: user })

      const res = await axios.get(currentUserPath)
      setCurrentUser(res.data)
    } catch (e) {
      // NOP
    }
  }

  return { currentUser, signin, signout, loading } // 呼び出し元のコンポーネントだとcurrentUserがnull
}
