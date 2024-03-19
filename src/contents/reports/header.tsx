import { useState } from 'react'

import Icon from '@/common/icons'
import SearchReportsForm from '@/components/form/search-reports'
import HeaderSection from '@/components/header-section'
import { useReportsTableContext } from '@/contexts/reports-table'

export default function ReportsHeader() {
  const [filter, setFilter] = useState(false)

  const { refetch } = useReportsTableContext()

  return (
    <>
      <HeaderSection title="Posts report manage">
        <section className="flex items-center gap-4">
          <div
            className="p-2 px-1 hover:cursor-pointer hover:text-secondary"
            onClick={() => refetch()}
          >
            <Icon name="Reload" size={16} />
          </div>
          <div
            className=" p-2 px-1 hover:cursor-pointer hover:text-secondary"
            onClick={() => setFilter((prev) => !prev)}
          >
            <Icon name="Filter" size={16} color={filter ? '#ff2461' : ''} />
          </div>
        </section>
      </HeaderSection>

      {filter && <SearchReportsForm />}
    </>
  )
}
