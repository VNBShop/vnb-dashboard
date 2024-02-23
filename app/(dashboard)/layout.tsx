import { PropsWithChildren } from 'react'

import dynamic from 'next/dynamic'
import { Session, getServerSession } from 'next-auth'

import Sidebar from '@/components/sidebar'
import { authOptions } from '@/libs/authOptions'

const SidebarMobile = dynamic(() => import('@/components/side-bar-mobile'), {
  ssr: false,
})

export default async function DoardboardLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  return (
    <main className="fixed inset-0 lg:grid lg:grid-cols-[17%_83%]">
      <div className="lg:col-span-[17%] hidden border-r lg:block">
        <Sidebar user={session?.user as Session['user']} />
      </div>
      <SidebarMobile user={session?.user as Session['user']} />
      <section className="overflow-auto p-4">{children}</section>
    </main>
  )
}
