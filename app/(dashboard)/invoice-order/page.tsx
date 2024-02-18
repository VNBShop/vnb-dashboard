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

      <div className="mt-5 flex items-center justify-center text-gray-500">
        Comming soon...
      </div>
    </section>
  )
}
