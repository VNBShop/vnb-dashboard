'use client'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'

import useHydration from '@/hooks/useHydration'

import useTableDataProduct from '@/hooks/useTableDataProduct'
import { Product } from '@/types/product'

import ProductsHeader from './header'
import ProductTableImage from './image'
import ProductTableSkeleton from './skeleton'

export default function ProductTableData() {
  const { hydration } = useHydration()

  const {
    data,
    isLoading,
    isFetching,
    currentPage,
    onSearch,
    onPageChange,
    onPerPageChange,
  } = useTableDataProduct()

  if (hydration) {
    return <p className="mt-4">Loading...</p>
  }

  const columns: TableColumn<Product>[] = [
    {
      name: 'ID',
      center: true,
      width: '70px',
      cell: (row) => row?.productId ?? '-',
    },
    {
      name: 'Image',
      center: true,
      cell: (row) => {
        return <ProductTableImage images={row?.productAssets ?? []} />
      },
    },
    {
      name: 'Name',
      cell: (row) => row?.productName ?? '-',
    },
    {
      name: 'Price',
      right: true,
      cell: (row) =>
        row?.productPrice?.toLocaleString('en-US', {
          currency: 'USD',
          style: 'currency',
        }) ?? '-',
    },
    {
      name: 'Status',
      width: '120px',
      center: true,
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
      center: true,
      width: '150px',
      cell: (row) => (
        <div>
          <Icon name="Ellipsis" size={18} />
        </div>
      ),
    },
  ]

  return (
    <>
      <ProductsHeader onSearch={onSearch} />
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
          />
        </section>
      )}
    </>
  )
}
