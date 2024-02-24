'use client'
import { createRef } from 'react'

import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import useAxiosPrivate from '@/api/private/useAxios'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import useDeactives from '@/hooks/useDeactives'
import useHydration from '@/hooks/useHydration'

import useTableDataProduct from '@/hooks/useTableDataProducts'
import { Product } from '@/types/product'

import ProductTableAction from './action'
import ProductsHeader from './header'
import ProductTableImage from './image'
import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function ProductTableData() {
  const { hydration } = useHydration()

  const axios = useAxiosPrivate()

  const deactiveModal = createRef<ModalProps>()

  const {
    data,
    isLoading,
    isFetching,
    currentPage,
    productSelected,
    onSearch,
    refetch,
    onPageChange,
    onPerPageChange,
    setProducts,
    onResetFilter,
  } = useTableDataProduct()

  const { loading, onDeactive } = useDeactives({
    modalRef: deactiveModal,
    refetch,
  })

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Product>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.productId ?? '-',
    },
    {
      name: 'Image',
      center: 1 as any,
      cell: (row) => {
        return <ProductTableImage images={row?.productImages ?? []} />
      },
    },
    {
      name: 'Name',
      cell: (row) => row?.productName ?? '-',
    },
    {
      name: 'Brand',
      cell: (row) => row?.productBrand?.brandName ?? '-',
    },
    {
      name: 'Category',
      cell: (row) => row?.productSubCategory?.subCategoryName ?? '-',
    },
    {
      name: 'Price',
      right: 1 as any,
      cell: (row) =>
        row?.productPrice?.toLocaleString('en-US', {
          currency: 'USD',
          style: 'currency',
        }) ?? '-',
    },
    {
      name: 'Status',
      width: '120px',
      center: 1 as any,
      cell: (row) => {
        return (
          <div
            className={`rounded-full p-1 px-3 text-[13px] font-medium ${
              row?.productStatus
                ? 'bg-[#e4f6e2] text-[#368a2f]'
                : 'bg-[#ffdddd] text-[#ff0e0e]'
            }`}
          >
            {row?.productStatus ? 'In stock' : 'Out stock'}
          </div>
        )
      },
    },
    {
      name: 'Action',
      center: 1 as any,
      width: '100px',
      cell: (row) => <ProductTableAction refetch={refetch} data={row} />,
    },
  ]

  return (
    <>
      <ProductsHeader
        onSearch={onSearch}
        loading={isLoading}
        refetch={refetch}
        onResetFilter={onResetFilter}
      />
      {isFetching || isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <section className="mt-4">
          {!!productSelected.length ? (
            <Button
              className=" mb-4 bg-danger"
              size="sm"
              onClick={() =>
                !!deactiveModal?.current && deactiveModal.current.onOpen()
              }
            >
              Deactivate
            </Button>
          ) : null}
          <DataTable
            columns={columns as []}
            data={data?.data ?? []}
            selectableRows
            pagination
            paginationServer
            selectableRowDisabled={(row) => !row.productStatus}
            onSelectedRowsChange={({ selectedRows }) =>
              setProducts(selectedRows.map((item) => item.productId))
            }
            paginationTotalRows={data?.total ?? 0}
            paginationDefaultPage={currentPage}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onPerPageChange}
            noDataComponent={
              <div className="mt-[120px] grid place-items-center gap-5">
                <Image
                  src={EmptyImg}
                  width={100}
                  height={100}
                  sizes="100vw"
                  alt="Empty"
                />
                <p className="font-medium text-gray-500">No data 😢</p>
              </div>
            }
          />
        </section>
      )}

      <Modal ref={deactiveModal} header="Deactivate products">
        <section>
          <p className=" my-4">
            Are you sure you want to deactivate{' '}
            <span className="text-danger">
              {productSelected?.length} products
            </span>
            ?
          </p>

          <footer className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={loading}
              className=" hover:underline"
              onClick={() => {
                if (!!deactiveModal.current) {
                  deactiveModal.current?.onClose()
                }
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className=" flex items-center gap-1 bg-danger"
              size="sm"
              onClick={() => onDeactive(productSelected)}
            >
              {loading && <Spinner size={16} />}
              Deactivates
            </Button>
          </footer>
        </section>
      </Modal>
    </>
  )
}
