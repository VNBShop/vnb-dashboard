import { createRef, useState } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import Icon from '@/common/icons'
import ProductForm from '@/components/form/product'
import SearchProductForm from '@/components/form/search-products'
import SearchStoreForm from '@/components/form/search-store'
import StoreForm from '@/components/form/store'
import HeaderSection from '@/components/header-section'
import { Modal, ModalProps } from '@/components/ui/modal'
import {
  ProductResponse,
  SearchProductTableProps,
} from '@/hooks/useTableDataProducts'

type ProductsHeaderProps = {
  onSearch: (values: SearchProductTableProps) => void
  loading: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
}

export default function StoresHeader({
  onSearch,
  loading,
  refetch,
}: ProductsHeaderProps) {
  const modalRef = createRef<ModalProps>()
  const [filter, setFilter] = useState(false)

  const onCloseModal = () => {
    if (modalRef && modalRef.current?.isOpen) {
      modalRef.current.onClose()
    }
  }

  return (
    <>
      <Modal ref={modalRef} size={'lg'} header="Create store form">
        <StoreForm onCloseModal={onCloseModal} refetch={refetch} />
      </Modal>
      <>
        <HeaderSection title="Stores manage">
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
              onClick={() => {
                if (modalRef && modalRef.current) {
                  modalRef.current.onOpen()
                }
              }}
              className="inline-flex items-center gap-1 rounded border bg-success p-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-success/90 lg:hover:bg-success lg:hover:text-white"
            >
              <Icon name="Plus" size={20} />
              Create
            </div>
          </section>
        </HeaderSection>

        {filter && <SearchStoreForm onSearch={onSearch} loading={loading} />}
      </>
    </>
  )
}
