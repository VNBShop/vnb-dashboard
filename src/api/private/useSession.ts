import { getSession } from 'next-auth/react'

export async function getAppSession() {
  return await getSession()
}
