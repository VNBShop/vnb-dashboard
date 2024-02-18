import { Breadcrumbs } from '@/components/breadscrum'
import HeaderSection from '@/components/header-section'
import StoresTableData from '@/contents/stores/table-data'

export default function Stores() {
  return (
    <section>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Invoice order',
            href: '/invoice-order',
          },
        ]}
      />

      <StoresTableData />
    </section>
  )
}
