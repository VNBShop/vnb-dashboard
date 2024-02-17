import { createRef, useState } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import Icon from '@/common/icons'
import AddProductForm from '@/components/form/add-product'
import SearchProductForm from '@/components/form/search-products'
import HeaderSection from '@/components/header-section'
import { Modal, ModalProps } from '@/components/ui/modal'
import {
  ProductResponse,
  SearchProductTableProps,
} from '@/hooks/useTableDataProduct'

type ProductsHeaderProps = {
  onSearch: (values: SearchProductTableProps) => void
  loading: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
}

export default function ProductsHeader({
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
      <Modal ref={modalRef} size={'lg'} header="Create product form">
        <AddProductForm onCloseModal={onCloseModal} refetch={refetch} />
      </Modal>
      <>
        <HeaderSection title="Products">
          <section className="flex items-center gap-4">
            <div
              className="flex h-[36px] w-[36px] items-center justify-center rounded border hover:cursor-pointer hover:bg-black hover:text-white"
              onClick={() => refetch()}
            >
              <Icon name="Reload" size={16} />
            </div>
            <div
              className="flex h-[36px] w-[36px] items-center justify-center rounded border  hover:cursor-pointer hover:bg-black hover:text-white"
              onClick={() => setFilter((prev) => !prev)}
            >
              <Icon name="Filter" size={16} />
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

        {filter && <SearchProductForm onSearch={onSearch} loading={loading} />}
      </>
    </>
  )
}
