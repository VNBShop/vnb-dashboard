'use client'
import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { UsersTableContext } from '@/contexts/users-table'
import useHydration from '@/hooks/useHydration'

import useUsersTable from '@/hooks/users/useUsersTable'

import { User } from '@/types/user'

import UsersShipperTableAction from './action'
import UsersHeader from './header'

import { EmptyImg } from '../../../public'

import StoresTableSkeleton from '.'

export default function UsersTableData() {
  const { hydration } = useHydration()

  const props = useUsersTable()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<User>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.userId ?? '-',
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
      cell: (row) => row?.phoneNumber ?? '-',
    },
    {
      name: 'Role',
      width: '200px',
      cell: (row) => {
        if (!row?.roles?.length) return '-'
        return (
          <>
            {row?.roles.map((role, index) => (
              <span key={role} className=" flex items-center gap-1">
                <span className="lowercase first-letter:uppercase">{role}</span>
                {index < row?.roles?.length - 1 && ','}
              </span>
            ))}
          </>
        )
      },
    },
    {
      name: 'Status',
      width: '120px',
      center: 1 as any,
      cell: (row) => {
        return (
          <div
            className={`rounded-full p-1 px-3 text-[13px] font-medium ${
              row?.isActive
                ? 'bg-[#e4f6e2] text-[#368a2f]'
                : 'bg-[#ffdddd] text-[#ff0e0e]'
            }`}
          >
            {row?.isActive ? 'Active' : 'Inactive'}
          </div>
        )
      },
    },
    {
      name: 'Action',
      center: 1 as any,
      width: '140px',
      cell: (row) => <UsersShipperTableAction data={row} />,
    },
  ]

  return (
    <UsersTableContext.Provider value={props}>
      <UsersHeader />
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
    </UsersTableContext.Provider>
  )
}
