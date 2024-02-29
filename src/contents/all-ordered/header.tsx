import { useState } from 'react'

import Icon from '@/common/icons'
import SearchOrdersForm from '@/components/form/search-order'
import HeaderSection from '@/components/header-section'
import { useOrdersTableContext } from '@/contexts/orders-table '
import useGetWarehouseFilter from '@/hooks/common/useGetWarehouseFilter'

export default function OrdersHeader() {
  const [filter, setFilter] = useState(false)

  const { refetch } = useOrdersTableContext()

  const { stores } = useGetWarehouseFilter()

  return (
    <>
      <HeaderSection title="All ordered">
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

      {filter && <SearchOrdersForm stores={stores} />}
    </>
  )
}
