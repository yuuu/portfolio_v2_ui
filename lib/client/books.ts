import axios from '../axios'
import useSWR, { mutate } from 'swr'

export type Book = {
  id: number
  title: string
  description: string
  image: string
  link: string
  key: string
}

export const useBooks = (): { books: Book[]; error: any } => {
  const fetcher = () => axios.get('/books').then((res) => res.data)
  const { data, error } = useSWR('/books', fetcher)
  return { books: data, error }
}

export const useBook = (id: number): { book: Book; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/books/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/books/${id}`, fetcher)
  return { book: data, error }
}

export const useCreateBook = () => {
  return async (book: Book) => {
    await axios.post(`/books/`, book)
    await mutate(`/books/`)
  }
}

export const useUpdateBook = () => {
  return async (id: number, book: Book) => {
    await axios.put(`/books/${id}`, book)
    await mutate(`/books/${id}`)
  }
}
