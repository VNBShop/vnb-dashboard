import { createRef, useState } from 'react'

import Icon from '@/common/icons'
import ProductForm from '@/components/form/product'
import SearchProductForm from '@/components/form/search-products'
import HeaderSection from '@/components/header-section'
import { Modal, ModalProps } from '@/components/ui/modal'
import { useProductTableContext } from '@/contexts/product-table'

export default function ProductsHeader() {
  const modalRef = createRef<ModalProps>()
  const [filter, setFilter] = useState(false)

  const { refetch } = useProductTableContext()

  const onCloseModal = () => {
    if (modalRef && modalRef.current?.isOpen) {
      modalRef.current.onClose()
    }
  }

  return (
    <>
      <Modal ref={modalRef} size={'lg'} header="Create product form">
        <ProductForm onCloseModal={onCloseModal} refetch={refetch} />
      </Modal>
      <>
        <HeaderSection title="Products">
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
            <div
              onClick={() => {
                if (modalRef && modalRef.current) {
                  modalRef.current.onOpen()
                }
              }}
              className="inline-flex items-center gap-1 rounded-lg border bg-success p-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-success/90 lg:hover:bg-success lg:hover:text-white"
            >
              <Icon name="Plus" size={20} />
              Create
            </div>
          </section>
        </HeaderSection>

        {filter && <SearchProductForm />}
      </>
    </>
  )
}
