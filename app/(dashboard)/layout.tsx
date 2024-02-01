import { PropsWithChildren } from 'react'

import Sidebard from '@/common/sidebar'

export default function DoardboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="fixed inset-0 grid lg:grid-cols-[20%_80%]">
      <Sidebard />
      <section className="overflow-auto p-4">{children}</section>
    </main>
  )
}
