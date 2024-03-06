import { Session, getServerSession } from 'next-auth'

import { Breadcrumbs } from '@/components/breadscrum'
import OrdersTableData from '@/contents/all-ordered'
import { authOptions } from '@/libs/authOptions'

export default async function AllOrdered() {
  const session = await getServerSession(authOptions)

  return (
    <section suppressHydrationWarning>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Orders',
            href: '/all-ordered',
          },
        ]}
      />

      <OrdersTableData user={session?.user as Session['user']} />
    </section>
  )
}
