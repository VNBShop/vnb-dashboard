import { Breadcrumbs } from '@/components/breadscrum'
import ProductTableData from '@/contents/products/table-data'

export default function ProductsPage() {
  return (
    <section suppressHydrationWarning>
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
        ]}
      />

      <ProductTableData />
    </section>
  )
}
