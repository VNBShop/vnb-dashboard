import { useState } from 'react'

import Icon from '@/common/icons'
import HeaderSection from '@/components/header-section'
import { useWareHouseImportedContext } from '@/contexts/warehouse-imported'

export default function WareHouseImportedHeader() {
  const [filter, setFilter] = useState(false)
  const { refetch } = useWareHouseImportedContext()
  return (
    <>
      <HeaderSection title="Warehouse imported management">
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
        <p>Hehe</p>
        // <SearchProductForm
        //   onSearch={onSearch}
        //   loading={loading}
        //   onResetFilter={onResetFilter}
        // />
      )}
    </>
  )
}
