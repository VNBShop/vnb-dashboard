import { useState } from 'react'

import Icon from '@/common/icons'
import CreateVoucherForm from '@/components/form/create-voucher'
import SearchVouchersForm from '@/components/form/search-vouchers'
import HeaderSection from '@/components/header-section'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useVouchersTableContext } from '@/contexts/vouchers-table'

export default function VouchersHeader() {
  const [filter, setFilter] = useState(false)
  const [create, setCreate] = useState(false)

  const { refetch } = useVouchersTableContext()

  const onCloseModal = () => {
    setCreate(false)
  }

  return (
    <>
      <HeaderSection title="Vouchers manage">
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

          <Button
            size="sm"
            className="h-10 rounded-lg bg-success hover:bg-success/70"
            onClick={() => setCreate(true)}
          >
            Create voucher
          </Button>
        </section>
      </HeaderSection>

      {filter && <SearchVouchersForm />}

      <Modal
        show={create}
        size="lg"
        onCloseModal={onCloseModal}
        header="Create voucher"
      >
        <CreateVoucherForm close={onCloseModal} />
      </Modal>
    </>
  )
}
