'use client'
import dayjs from 'dayjs'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { ReportsTableContext } from '@/contexts/reports-table'
import useReportsTable from '@/hooks/reports/useReportsTable'
import useHydration from '@/hooks/useHydration'

import { Report } from '@/types/user'

import UsersShipperTableAction from './action'

import ReportsTableAction from './action'
import ReportsHeader from './header'

import { EmptyImg } from '../../../public'

import StoresTableSkeleton from '.'

export default function ReportsTableData() {
  const { hydration } = useHydration()

  const props = useReportsTable()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Report>[] = [
    {
      name: 'Time',
      center: 1 as any,
      cell: (row) => {
        if (!row?.reportedAt) return

        return dayjs(row?.reportedAt).format('HH:mm:ss DD/MM/YYYY')
      },
    },
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.postReportId ?? '-',
    },
    {
      name: 'Reporter',
      cell: (row) => row?.reporterName ?? '-',
    },
    {
      name: 'Post id',
      center: 1 as any,
      cell: (row) =>
        !!row?.post?.postId ? <ReportsTableAction data={row} /> : '-',
    },
    {
      name: 'Status',
      width: '120px',
      center: 1 as any,
      cell: (row) => {
        return (
          <div
            className={`rounded-full p-1 px-3 text-[13px] font-medium lowercase first-letter:uppercase ${
              row?.status
                ? 'bg-[#e4f6e2] text-[#368a2f]'
                : 'bg-[#ffdddd] text-[#ff0e0e]'
            }`}
          >
            {row?.status}
          </div>
        )
      },
    },
  ]

  return (
    <ReportsTableContext.Provider value={props}>
      <ReportsHeader />
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
    </ReportsTableContext.Provider>
  )
}
