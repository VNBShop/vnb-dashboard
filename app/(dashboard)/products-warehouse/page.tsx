import { Breadcrumbs } from '@/components/breadscrum'
import ProductWarehouseTableData from '@/contents/products-warehouse/table-data'

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
            title: 'Products',
            href: '/products-stock',
          },
        ]}
      />

      <ProductWarehouseTableData />
    </section>
  )
}
