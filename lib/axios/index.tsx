import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})
