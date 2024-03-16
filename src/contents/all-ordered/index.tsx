'use client'

import Image from 'next/image'
import { Session } from 'next-auth'
import DataTable, { TableColumn } from 'react-data-table-component'

import { OrdersTableContext } from '@/contexts/orders-table '
import useOrdersTable from '@/hooks/order/useOrdersTable'
import useHydration from '@/hooks/useHydration'

import { colorsOrderedStatus, orderedStatusOption } from '@/libs/constants'
import { Order, OrderedStatus } from '@/types/order'

import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

type IProps = {
  user: Session['user']
}

export default function OrdersTableData({ user }: IProps) {
  const { hydration } = useHydration()

  const props = useOrdersTable({ isAdmin: !!user?.roles?.includes('ADMIN') })

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Order>[] = [
    {
      name: 'ID',
      center: 1 as any,
      width: '70px',
      cell: (row) => row?.orderId ?? '-',
    },
    {
      name: 'Customer ID',
      center: 1 as any,
      cell: (row) => row?.orderId ?? '-',
    },
    {
      name: 'Customer name',
      center: 1 as any,
      cell: (row) => row?.customer?.customerName ?? '-',
    },
    {
      name: 'Customer phone',
      center: 1 as any,
      cell: (row) => row?.customer?.customerPhone ?? '-',
    },
    {
      name: 'Store',
      cell: (row) => row?.store?.storeName ?? '-',
    },
    {
      name: 'Payment type',
      center: 1 as any,
      cell: (row) => (
        <p className=" lowercase first-letter:uppercase">
          {row?.paymentType ?? '-'}
        </p>
      ),
    },
    {
      name: 'Total',
      right: 1 as any,
      cell: (row) => row?.totalPrice?.toLocaleString() ?? '-',
    },

    {
      name: 'Status',
      width: '120px',
      center: 1 as any,
      cell: (row) => {
        return (
          <div
            style={{
              color:
                colorsOrderedStatus[row?.orderStatus as OrderedStatus]?.color,
              backgroundColor:
                colorsOrderedStatus[row?.orderStatus as OrderedStatus]
                  ?.backgroundColor,
            }}
            className={`rounded-full p-1 px-3 text-[13px] font-medium lowercase first-letter:uppercase`}
          >
            {orderedStatusOption?.find(
              (order) => order?.value === row?.orderStatus
            )?.label ?? '-'}
          </div>
        )
      },
    },
  ]

  return (
    <OrdersTableContext.Provider value={props}>
      {/* <OrdersHeader /> */}
      {props.isFetching || props.isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <section className="mt-4">
          <DataTable
            columns={columns as []}
            data={props?.data ?? []}
            pagination
            paginationServer
            paginationTotalRows={props?.total ?? 0}
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
    </OrdersTableContext.Provider>
  )
}
