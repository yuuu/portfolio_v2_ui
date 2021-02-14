import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type Article = {
  id: number
  title: string
  body: string
  image: string
  publishedAt: string
  link: string
}

export const useArticles = (): { articles: Article[]; error: any } => {
  const fetcher = () => axios.get('/articles').then((res) => res.data)
  const { data, error } = useSWR('/articles', fetcher)
  return { articles: data, error }
}

export const useArticle = (id: number): { article: Article; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/articles/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/articles/${id}`, fetcher)
  return { article: data, error }
}

export const useCreateArticle = () => {
  return async (article: Article) => {
    await axios.post(`/articles/`, article)
    await mutate(`/articles/`)
  }
}

export const useUpdateArticle = () => {
  return async (id: number, article: Article) => {
    await axios.put(`/articles/${id}`, article)
    await mutate(`/articles/${id}`)
  }
}
