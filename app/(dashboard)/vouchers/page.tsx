import { Breadcrumbs } from '@/components/breadscrum'
import VouchersTableData from '@/contents/vouchers/table-data'

export default function Vouchers() {
  return (
    <section>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Vouchers',
            href: '/vouchers',
          },
        ]}
      />

      <VouchersTableData />
    </section>
  )
}
