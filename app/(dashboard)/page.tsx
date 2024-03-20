import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import HomePage from '@/contents/home'
import { authOptions } from '@/libs/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session?.user?.roles?.includes('ADMIN')) {
    return <HomePage />
  }

  return redirect('/invoice-order')
}
