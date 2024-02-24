'use client'
import { createRef } from 'react'

import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { Button } from '@/components/ui/button'
import { ModalProps } from '@/components/ui/modal'
import useHydration from '@/hooks/useHydration'

import useTableDataProductsWarehouse from '@/hooks/useTableDataProductsWarehouse'
import { ProductWarehouse } from '@/types/product'

import ProductWarehouseTableAction from './action'
import ProductsWarehouseHeader from './header'
import ProductWarehouseTableImage from './image'
import ProductsWarehouseQuantityColumn from './quanities-column'
import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function ProductWarehouseTableData() {
  const { hydration } = useHydration()

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
    onResetFilter,
  } = useTableDataProductsWarehouse()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<ProductWarehouse>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.productId ?? '-',
    },
    {
      name: 'Name',
      cell: (row) => row?.productName ?? '-',
    },
    {
      name: 'Image',
      center: 1 as any,
      cell: (row) => {
        return <ProductWarehouseTableImage images={row?.productImages ?? ''} />
      },
    },
    {
      name: 'Quantities',
      cell: (row) => {
        if (!row.productSizeAndStockResponses.length) return '-'
        return <ProductsWarehouseQuantityColumn refetch={refetch} row={row} />
      },
    },
    // {
    //   name: 'Action',
    //   center: 1 as any,
    //   width: '100px',
    //   cell: (row) => (
    //     <ProductWarehouseTableAction refetch={refetch} data={row} />
    //   ),
    // },
  ]

  return (
    <>
      <ProductsWarehouseHeader
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
            pagination
            paginationServer
            selectableRowDisabled={(row) => !row.productStatus}
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
    </>
  )
}