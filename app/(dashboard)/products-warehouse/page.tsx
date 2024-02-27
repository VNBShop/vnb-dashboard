import { Breadcrumbs } from '@/components/breadscrum'
import ProductWarehouseTableData from '@/contents/products-warehouse'

export default function ProductsWarehousePage() {
  return (
    <section suppressHydrationWarning>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Products warehouse',
            href: '/products-stock',
          },
        ]}
      />

      <ProductWarehouseTableData />
    </section>
  )
}
