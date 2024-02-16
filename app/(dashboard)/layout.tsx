import { PropsWithChildren } from 'react'

import { Session, getServerSession } from 'next-auth'

import Sidebard from '@/components/sidebar'
import { authOptions } from '@/libs/authOptions'

export default async function DoardboardLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  return (
    <main className="fixed inset-0 grid lg:grid-cols-[20%_80%]">
      <Sidebard user={session?.user as Session['user']} />
      <section className="overflow-auto p-4">{children}</section>
    </main>
  )
}
