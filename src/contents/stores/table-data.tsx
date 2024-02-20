'use client'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import useHydration from '@/hooks/useHydration'

import useTableDataStores from '@/hooks/useTableDataStores'

import { Store } from '@/types/store'

import ProductTableAction from './action'
import StoresHeader from './header'

import StoresTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function StoresTableData() {
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
  } = useTableDataStores()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Store>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.storeId ?? '-',
    },
    {
      name: 'Name',
      cell: (row) => row?.storeName ?? '-',
    },
    {
      name: 'Address',
      cell: (row) => row?.storeAddress ?? '-',
    },
    {
      name: 'Status',
      width: '120px',
      center: 1 as any,
      cell: (row) => {
        return (
          <div
            className={`rounded-full p-1 px-3 text-[13px] font-medium ${
              row?.status
                ? 'bg-[#e4f6e2] text-[#368a2f]'
                : 'bg-[#ffdddd] text-[#ff0e0e]'
            }`}
          >
            {row?.status ? 'Active' : 'Inactive'}
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
      <StoresHeader onSearch={onSearch} loading={isLoading} refetch={refetch} />
      {isFetching || isLoading ? (
        <StoresTableSkeleton />
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
