import { Breadcrumbs } from '@/components/breadscrum'
import ReportsTableData from '@/contents/reports/table-data'
import ShipperTableData from '@/contents/shipper/table-data'
import UsersTableData from '@/contents/users/table-data'

export default function Report() {
  return (
    <section>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Reports',
            href: '/reports',
          },
        ]}
      />

      <ReportsTableData />
    </section>
  )
}
