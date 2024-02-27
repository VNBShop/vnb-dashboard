'use client'
import { createRef } from 'react'

import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { Button } from '@/components/ui/button'
import { ModalProps } from '@/components/ui/modal'
import { ProductWarehouseTableContext } from '@/contexts/warehouse-product-table'
import useHydration from '@/hooks/useHydration'

import useProductsWarehouseTable from '@/hooks/warehouses/useProductsWarehouseTable'
import { ProductWarehouse } from '@/types/warehouse'

import ProductsWarehouseHeader from './header'
import ProductWarehouseTableImage from './image'
import ProductsWarehouseQuantityColumn from './quanities-column'
import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function ProductWarehouseTableData() {
  const { hydration } = useHydration()

  const deactiveModal = createRef<ModalProps>()

  const props = useProductsWarehouseTable()

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
        return (
          <ProductsWarehouseQuantityColumn refetch={props?.refetch} row={row} />
        )
      },
    },
  ]

  return (
    <ProductWarehouseTableContext.Provider value={props}>
      <ProductsWarehouseHeader />
      {props?.isFetching || props?.isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <section className="mt-4">
          {!!props?.productSelected.length ? (
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
            data={props?.data?.data ?? []}
            pagination
            paginationServer
            selectableRowDisabled={(row) => !row.productStatus}
            paginationTotalRows={props?.data?.total ?? 0}
            paginationDefaultPage={props?.currentPage}
            onChangePage={props?.onPageChange}
            onChangeRowsPerPage={props?.onPerPageChange}
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
    </ProductWarehouseTableContext.Provider>
  )
}
