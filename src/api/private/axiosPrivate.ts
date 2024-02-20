import axios from 'axios'
import { Session } from 'next-auth'

const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_SERVER_API_SERVICE,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    const session = await fetch(`/api/auth/session`, {
      headers: {
        'content-type': 'application/json',
      },
    } satisfies RequestInit)
    const json = await session.json()
    const data = Object.keys(json).length > 0 ? json : null

    const user: Session['user'] = data?.user
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${user.accessToken}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

export default axiosPrivate
