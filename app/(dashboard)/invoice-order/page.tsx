import { Breadcrumbs } from '@/components/breadscrum'
import InvoiceOrderForm from '@/components/form/invoice-order'
import HeaderSection from '@/components/header-section'

export default function InvoiceOrderPage() {
  return (
    <>
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

        <InvoiceOrderForm />
      </section>
      <div
        className=" fixed inset-0 z-[-1] bg-[rgb(245,247,250)]"
        aria-hidden
      />
    </>
  )
}
