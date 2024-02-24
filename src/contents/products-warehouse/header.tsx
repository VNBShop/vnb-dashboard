import { Dispatch, SetStateAction, useState } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import Icon from '@/common/icons'
import SearchProductWarehouseForm from '@/components/form/search-products-warehouse'
import HeaderSection from '@/components/header-section'
import {
  ProductsWarehouseResponse,
  SearchProductWarehouseTableProps,
} from '@/hooks/useTableDataProductsWarehouse'

type ProductsWarehouseHeaderProps = {
  onSearch: (values: SearchProductWarehouseTableProps) => void
  loading: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductsWarehouseResponse, Error>>
  onResetFilter: () => void
}

export default function ProductsWarehouseHeader({
  onSearch,
  loading,
  refetch,
  onResetFilter,
}: ProductsWarehouseHeaderProps) {
  const [filter, setFilter] = useState(false)

  return (
    <>
      <HeaderSection title="Warehouse management">
        <section className="flex items-center gap-4">
          <div
            className="p-2 px-1 hover:cursor-pointer hover:text-secondary"
            onClick={() => refetch()}
          >
            <Icon name="Reload" size={16} />
          </div>
          <div
            className="p-2 px-1 hover:cursor-pointer hover:text-secondary"
            onClick={() => setFilter((prev) => !prev)}
          >
            <Icon name="Filter" size={16} color={filter ? '#ff2461' : ''} />
          </div>
        </section>
      </HeaderSection>

      {filter && (
        <SearchProductWarehouseForm
          onResetFilter={onResetFilter}
          onSearch={onSearch}
          loading={loading}
        />
      )}
    </>
  )
}
