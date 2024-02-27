import { useState } from 'react'

import Icon from '@/common/icons'
import SearchProductWarehouseForm from '@/components/form/search-products-warehouse'
import HeaderSection from '@/components/header-section'
import { useProductWarehouseTableContext } from '@/contexts/warehouse-product-table'

export default function ProductsWarehouseHeader() {
  const [filter, setFilter] = useState(false)

  const { refetch } = useProductWarehouseTableContext()

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

      {filter && <SearchProductWarehouseForm />}
    </>
  )
}
