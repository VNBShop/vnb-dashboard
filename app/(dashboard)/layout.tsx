import { PropsWithChildren } from 'react'

import Sidebard from '@/common/sidebar'
import Breadcrumbs from '@/components/breadscrum'

export default function DoardboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="fixed inset-0 grid lg:grid-cols-[22%_78%]">
      <Sidebard />
      <section className="bg-[#F4F7FE] p-4">
        <Breadcrumbs rootLabel="Home" />
        {children}
      </section>
    </main>
  )
}
