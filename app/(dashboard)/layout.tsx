import { PropsWithChildren } from 'react'

import Sidebard from '@/common/sidebar'

export default function DoardboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="fixed inset-0 grid lg:grid-cols-[22%_78%]">
      <Sidebard />
      <section className="overflow-auto bg-[#F4F7FE] p-4">{children}</section>
    </main>
  )
}
