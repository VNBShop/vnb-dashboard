import { Breadcrumbs } from '@/components/breadscrum'
import ShipperTableData from '@/contents/shipper/table-data'
import UsersTableData from '@/contents/users/table-data'

export default function Shipper() {
  return (
    <section>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Users',
            href: '/users',
          },
        ]}
      />

      <UsersTableData />
    </section>
  )
}
