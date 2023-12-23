import { Breadcrumbs } from '@/components/breadscrum'
import HeaderSection from '@/components/header-section'

export default function InvoiceOrderPage() {
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

      <HeaderSection title="Invoice order" />
    </section>
  )
}
