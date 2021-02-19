import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type App = {
  id: number
  title: string
  category: string
  description: string
  image: string
  link: string
  key: string
}

export const useApps = (): { apps: App[]; error: any } => {
  const fetcher = () => axios.get('/apps').then((res) => res.data)
  const { data, error } = useSWR('/apps', fetcher)
  return { apps: data, error }
}

export const useApp = (id: number): { app: App; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/apps/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/apps/${id}`, fetcher)
  return { app: data, error }
}

export const useCreateApp = () => {
  return async (app: App) => {
    await axios.post(`/apps/`, app)
    await mutate(`/apps/`)
  }
}

export const useUpdateApp = () => {
  return async (id: number, app: App) => {
    await axios.put(`/apps/${id}`, app)
    await mutate(`/apps/${id}`)
  }
}
