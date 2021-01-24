import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios'

export type User = {
  id: number
  createdAt: string
  updatedAt: string
}

export const useSignin = (signinPath, redirectPath, currentUserPath) => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        await axios.get(currentUserPath)
        router.push(redirectPath)
      } catch (e) {
        setLoading(false)
      }
    })()
  }, [])

  const signin = async (user) => {
    setLoading(true)
    try {
      await axios.post(signinPath, { administrator: user })
      router.push(redirectPath)
    } catch (e) {
      setLoading(false)
    }
  }

  return { signin, loading }
}

export const useSignout = (signoutPath, redirectPath, currentUserPath) => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const signout = async () => {
    setLoading(true)
    try {
      await axios.get(currentUserPath)
      await axios.delete(signoutPath)
    } catch (e) {
      setLoading(false)
      router.push(redirectPath)
    }
  }

  return { signout, loading }
}

export const useAuth = (currentUserPath, redirectPath) => {
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
        router.push(redirectPath)
      }
    })()
  }, [])

  return { currentUser, loading }
}

export const useCurrentUser = (currentUserPath) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await axios.get(currentUserPath)
        setCurrentUser(res.data)
      } catch (e) {
        // NOP
      }
      setLoading(false)
    })()
  }, [])

  return { currentUser, loading }
}
