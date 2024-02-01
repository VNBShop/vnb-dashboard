import Link from 'next/link'

import Icon from '@/common/icons'
import { Breadcrumbs } from '@/components/breadscrum'
import HeaderSection from '@/components/header-section'
import { Button } from '@/components/ui/button'
import FormCreate from '@/contents/product/form-create'
import ProductTableData from '@/contents/product/table-data'

export default function ProductsPage() {
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
        ]}
      />

      <ProductTableData />
    </section>
  )
}
