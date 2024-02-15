import { Breadcrumbs } from '@/components/breadscrum'
import AddProductForm from '@/components/form/add-product'
import HeaderSection from '@/components/header-section'

export default function ProductCreatePage() {
  return (
    <section>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Products',
            href: '/products',
          },
          {
            title: 'Create',
            href: '/product-create',
          },
        ]}
      />

      <HeaderSection title="Create product ✍🏼" />

      <AddProductForm />
    </section>
  )
}
