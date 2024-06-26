import { useState } from 'react'

import Icon from '@/common/icons'
import WarehouseHistoryFilterForm from '@/components/form/warehouse-filter'
import HeaderSection from '@/components/header-section'
import { useWareHouseExportedContext } from '@/contexts/warehouse-exported'

export default function WareHouseExportedHeader() {
  const [filter, setFilter] = useState(false)
  const { refetch, admins, stores } = useWareHouseExportedContext()
  return (
    <>
      <HeaderSection title="Warehouse exported management">
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
        <WarehouseHistoryFilterForm
          admins={admins}
          stores={stores}
          isExported
        />
      )}
    </>
  )
}
