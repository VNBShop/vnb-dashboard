'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import DataTable, { TableColumn } from 'react-data-table-component'

import useHydration from '@/hooks/useHydration'

import useTableDataProduct from '@/hooks/useTableDataProduct'
import { Product } from '@/types/product'

import ProductTableAction from './action'
import ProductsHeader from './header'
import ProductTableImage from './image'
import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function ProductTableData() {
  const { hydration } = useHydration()

  const {
    data,
    isLoading,
    isFetching,
    currentPage,
    onSearch,
    refetch,
    onPageChange,
    onPerPageChange,
  } = useTableDataProduct()

  if (hydration) {
    return <p className="mt-4">Loading...</p>
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
      width: '220px',
      cell: (row) => <ProductTableAction data={row} />,
    },
  ]

  return (
    <>
      <ProductsHeader
        onSearch={onSearch}
        loading={isLoading}
        refetch={refetch}
      />
      {isFetching || isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <section className="mt-4">
          <DataTable
            columns={columns as []}
            data={data?.data ?? []}
            pagination
            paginationServer
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
