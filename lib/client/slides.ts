import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type Slide = {
  id: number
  title: string
  body: string
  image: string
  publishedAt: string
  link: string
}

// export const useArticles = (): { articles: Article[]; error: any } => {
//   const fetcher = () => axios.get('/articles').then((res) => res.data)
//   const { data, error } = useSWR('/articles', fetcher)
//   return { articles: data, error }
// }

export const useSlide = (id: number): { slide: Slide; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/slides/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/slides/${id}`, fetcher)
  return { slide: data, error }
}

export const useCreateSlide = () => {
  return async (slide: Slide) => {
    await axios.post(`/slides/`, slide)
    await mutate(`/slides/`)
  }
}

export const useUpdateSlide = () => {
  return async (id: number, slide: Slide) => {
    await axios.put(`/slides/${id}`, slide)
    await mutate(`/slides/${id}`)
  }
}
