import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type Profile = {
  introduction: string
  residence: string
  birthplace: string
  birthday: string
  hobby: string
}

export const useProfile = (): { profile: Profile; error: any } => {
  const fetcher = () => axios.get(`/profiles/1`).then((res) => res.data)
  const { data, error } = useSWR(`/profiles/1`, fetcher)
  return { profile: data, error }
}

export const useUpdateProfile = () => {
  return async (profile: Profile) => {
    await axios.put(`/profiles/1`, profile)
    await mutate(`/profiles/1`)
  }
}
