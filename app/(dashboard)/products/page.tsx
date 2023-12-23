import Link from 'next/link'

import Icon from '@/common/icons'
import { Breadcrumbs } from '@/components/breadscrum'
import HeaderSection from '@/components/header-section'
import { Button } from '@/components/ui/button'
import FormCreate from '@/contents/product/form-create'

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

      <HeaderSection title="Products">
        <Link
          href="/product/create"
          className="flex items-center gap-1 rounded-md border border-success bg-white p-2 text-sm font-medium text-success lg:hover:bg-success lg:hover:text-white"
        >
          <Icon name="Plus" width={16} height={16} />
          Create product
        </Link>
      </HeaderSection>

      <FormCreate />
    </section>
  )
}
