import { useState } from 'react'

import Link from 'next/link'

import Icon from '@/common/icons'
import SearchProductForm from '@/components/form/search-products'
import HeaderSection from '@/components/header-section'
import { SearchProductTableProps } from '@/hooks/useTableDataProduct'

type ProductsHeaderProps = {
  onSearch: (values: SearchProductTableProps) => void
  loading: boolean
}

export default function ProductsHeader({
  onSearch,
  loading,
}: ProductsHeaderProps) {
  const [filter, setFilter] = useState(false)

  return (
    <>
      <HeaderSection title="Products">
        <section className="flex items-center gap-4">
          <div
            className="flex h-[36px] items-center justify-center rounded border px-4 hover:cursor-pointer hover:bg-black hover:text-white"
            onClick={() => setFilter((prev) => !prev)}
          >
            <Icon name="Filter" size={16} />
          </div>
          <Link
            href="/product/create"
            className=" inline-flex items-center gap-1 rounded border bg-success p-2 px-4 text-sm font-medium text-white lg:hover:bg-success lg:hover:text-white"
          >
            <Icon name="Plus" size={20} />
            Create
          </Link>
        </section>
      </HeaderSection>

      {filter && <SearchProductForm onSearch={onSearch} loading={loading} />}
    </>
  )
}
