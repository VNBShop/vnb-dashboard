'use client'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { ShipperTableContext } from '@/contexts/shipper-table'
import useShipperTable from '@/hooks/shipper/useShipperTable'
import useHydration from '@/hooks/useHydration'

import { Shipper } from '@/types/order'

import ShipperTableAction from './action'
import ShipperHeader from './header'

import { EmptyImg } from '../../../public'

import StoresTableSkeleton from '.'

export default function ShipperTableData() {
  const { hydration } = useHydration()

  const props = useShipperTable()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Shipper>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.shipperId ?? '-',
    },
    {
      name: 'Name',
      cell: (row) =>
        row?.firstName || row?.lastName
          ? `${row?.firstName} ${row?.lastName}`
          : '-',
    },
    {
      name: 'Avatar',
      cell: (row) => {
        if (!row?.avatar) return '-'
        return (
          <figure className=" relative h-14 w-16 rounded">
            <Image
              src={row.avatar}
              alt="avt"
              fill
              sizes="100vw"
              className=" object-cover"
            />
          </figure>
        )
      },
    },
    {
      name: 'Email',
      cell: (row) => row?.email ?? '-',
    },
    {
      name: 'Phone number',
      cell: (row) => row?.phone ?? '-',
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
      width: '140px',
      cell: (row) => <ShipperTableAction data={row} />,
    },
  ]

  return (
    <ShipperTableContext.Provider value={props}>
      <ShipperHeader />
      {props?.isLoading ? (
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
    </ShipperTableContext.Provider>
  )
}
