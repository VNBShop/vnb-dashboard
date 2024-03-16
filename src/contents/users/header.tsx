import { useState } from 'react'

import Icon from '@/common/icons'
import CreateShipperForm from '@/components/form/create-shipper'
import SearchStoreForm from '@/components/form/search-store'
import SearchUsersForm from '@/components/form/search-users'
import HeaderSection from '@/components/header-section'
import { Modal } from '@/components/ui/modal'
import { useUsersTableContext } from '@/contexts/users-table'

export default function UsersHeader() {
  const [filter, setFilter] = useState(false)

  const { refetch } = useUsersTableContext()

  return (
    <>
      <HeaderSection title="User manage">
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

      {filter && <SearchUsersForm />}
    </>
  )
}
