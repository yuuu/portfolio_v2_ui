import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type Skill = {
  id: number
  title: string
  image: string
  key: string
}

export const useSkills = (): { skills: Skill[]; error: any } => {
  const fetcher = () => axios.get('/skills').then((res) => res.data)
  const { data, error } = useSWR('/skills', fetcher)
  return { skills: data, error }
}

export const useSkill = (id: number): { skill: Skill; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/skills/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/skills/${id}`, fetcher)
  return { skill: data, error }
}

export const useCreateSkill = () => {
  return async (skill: Skill) => {
    await axios.post(`/skills/`, skill)
    await mutate(`/skills/`)
  }
}

export const useUpdateSkill = () => {
  return async (id: number, skill: Skill) => {
    await axios.put(`/skills/${id}`, skill)
    await mutate(`/skills/${id}`)
  }
}
