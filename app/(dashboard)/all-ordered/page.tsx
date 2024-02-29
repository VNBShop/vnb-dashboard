import { Breadcrumbs } from '@/components/breadscrum'
import OrdersTableData from '@/contents/all-ordered'

export default function AllOrdered() {
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

      <OrdersTableData />
    </section>
  )
}
