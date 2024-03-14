import { createRef, useState } from 'react'

import Icon from '@/common/icons'
import CreateShipperForm from '@/components/form/create-shipper'
import SearchStoreForm from '@/components/form/search-store'
import StoreForm from '@/components/form/store'
import HeaderSection from '@/components/header-section'
import { Modal, ModalProps } from '@/components/ui/modal'
import { useShipperTableContext } from '@/contexts/shipper-table'

export default function ShipperHeader() {
  const [filter, setFilter] = useState(false)
  const [modal, setModal] = useState(false)

  const { refetch } = useShipperTableContext()

  const onCloseModal = () => {
    setModal(false)
  }

  return (
    <>
      <Modal
        onCloseModal={onCloseModal}
        show={modal}
        size={'lg'}
        header="Add new shipper"
      >
        <CreateShipperForm onCloseModal={onCloseModal} />
      </Modal>
      <>
        <HeaderSection title="Shipper manage">
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
            <div
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-1 rounded-lg border bg-success p-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-success/90 lg:hover:bg-success lg:hover:text-white"
            >
              <Icon name="Plus" size={20} />
              Add shipper
            </div>
          </section>
        </HeaderSection>

        {filter && <SearchStoreForm />}
      </>
    </>
  )
}
