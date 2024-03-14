import { Breadcrumbs } from '@/components/breadscrum'
import HeaderSection from '@/components/header-section'
import ShipperTableData from '@/contents/shipper/table-data'
import StoresTableData from '@/contents/stores/table-data'

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
            title: 'Shipper',
            href: '/shipper',
          },
        ]}
      />

      <ShipperTableData />
    </section>
  )
}
