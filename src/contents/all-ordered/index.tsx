'use client'

import Image from 'next/image'
import DataTable, { TableColumn } from 'react-data-table-component'

import { OrdersTableContext } from '@/contexts/orders-table '
import useOrdersTable from '@/hooks/order/useOrdersTable'
import useHydration from '@/hooks/useHydration'

import { Order } from '@/types/order'

import OrdersHeader from './header'
import ProductTableSkeleton from './skeleton'

import { EmptyImg } from '../../../public'

export default function OrdersTableData() {
  const { hydration } = useHydration()

  const props = useOrdersTable()

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
      name: 'Customer',
      center: 1 as any,
      cell: (row) => row?.orderId ?? '-',
    },
    {
      name: 'Store',
      cell: (row) => row?.store?.storeName ?? '-',
    },
    {
      name: 'Payment type',
      center: 1 as any,
      cell: (row) => row?.paymentType ?? '-',
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
            className={`rounded-full p-1 px-3 text-[13px] font-medium lowercase first-letter:uppercase`}
          >
            {row?.orderStatus ?? '-'}
          </div>
        )
      },
    },
  ]

  return (
    <OrdersTableContext.Provider value={props}>
      <OrdersHeader />
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
