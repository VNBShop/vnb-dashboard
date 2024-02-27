'use client'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { StoreTableContext } from '@/contexts/stores-table'
import useTableDataStores from '@/hooks/stores/useStoresTable'
import useStoresTable from '@/hooks/stores/useStoresTable'
import useHydration from '@/hooks/useHydration'

import { Store } from '@/types/store'

import StoreTableAction from './action'
import StoresHeader from './header'

import { EmptyImg } from '../../../public'

import StoresTableSkeleton from '.'

export default function StoresTableData() {
  const { hydration } = useHydration()

  const props = useStoresTable()

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
      name: 'Email',
      cell: (row) => row?.storeEmail ?? '-',
    },
    {
      name: 'Phone number',
      cell: (row) => row?.storePhone ?? '-',
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
      name: 'Owner name',
      cell: (row) => row?.storeOwnerName ?? '-',
    },
    // {
    //   name: 'Owner email',
    //   cell: (row) => row?.storeOwnerEmail ?? '-',
    // },
    {
      name: 'Owner phone number',
      cell: (row) => row?.storeOwnerPhone ?? '-',
    },
    {
      name: 'Action',
      center: 1 as any,
      width: '100px',
      cell: (row) => <StoreTableAction refetch={props?.refetch} data={row} />,
    },
  ]

  return (
    <StoreTableContext.Provider value={props}>
      <StoresHeader />
      {props?.isFetching || props?.isLoading ? (
        <StoresTableSkeleton />
      ) : (
        <section className="mt-4">
          <DataTable
            columns={columns as []}
            data={props?.data?.data ?? []}
            pagination
            paginationServer
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
    </StoreTableContext.Provider>
  )
}
