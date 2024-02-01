import { Breadcrumbs } from '@/components/breadscrum'
import ProductTableData from '@/contents/product/table-data'

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
