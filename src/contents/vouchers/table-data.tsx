'use client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DataTable, { TableColumn } from 'react-data-table-component'

import { toast } from 'sonner'

import Icon from '@/common/icons'
import { VouchersTableContext } from '@/contexts/vouchers-table'
import useHydration from '@/hooks/useHydration'

import useVouchersTable from '@/hooks/vouchers/useVouchersTable'
import { Voucher } from '@/types/order'

import VouchersTableAction from './action'
import VouchersHeader from './header'

import { EmptyImg } from '../../../public'

import StoresTableSkeleton from '.'

dayjs.extend(relativeTime)

export default function VouchersTableData() {
  const { hydration } = useHydration()

  const props = useVouchersTable()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }

  const columns: TableColumn<Voucher>[] = [
    {
      name: 'Created',
      center: 1 as any,
      cell: (row) => {
        if (!row?.startedAt) return '-'

        return dayjs(row?.startedAt).format('HH:mm:ss DD/MM/YYYY')
      },
    },
    {
      name: 'Expire',
      center: 1 as any,
      cell: (row) => {
        if (!row?.expiredAt) return '-'

        return dayjs(row?.expiredAt) < dayjs() ? (
          <span className="rounded-full bg-[#ffdddd] px-3 py-1 text-xs font-medium text-danger">
            Expired
          </span>
        ) : (
          dayjs(row?.expiredAt).fromNow()
        )
      },
    },
    {
      name: 'ID',
      cell: (row) => row?.voucherId ?? '-',
    },
    {
      name: 'Code',
      center: 1 as any,
      cell: (row) => {
        if (!row?.voucherCode) return '-'

        return dayjs(row?.expiredAt) < dayjs() ? (
          <span className="text-gray-600">{row?.voucherCode}</span>
        ) : (
          <CopyToClipboard
            text={row?.voucherCode}
            onCopy={() => toast.success('Copy voucher successfully!')}
          >
            <span className="flex items-center gap-1 text-success hover:cursor-pointer">
              {row?.voucherCode}
              <Icon name="Copy" size={14} />
            </span>
          </CopyToClipboard>
        )
      },
    },
    {
      name: 'Discount',
      center: 1 as any,
      cell: (row) => {
        if (!row?.voucherPercent) return '-'
        return `${row?.voucherPercent * 100}%`
      },
    },
    {
      name: 'Max discount',
      center: 1 as any,
      cell: (row) => row?.maxDiscount?.toLocaleString() ?? '-',
    },
    {
      name: 'Quantity',
      center: 1 as any,
      cell: (row) => row?.quantity?.toLocaleString() ?? '-',
    },
    {
      name: 'Action',
      width: '170px',
      center: 1 as any,
      cell: (row) => {
        return <VouchersTableAction data={row} />
      },
    },
  ]

  return (
    <VouchersTableContext.Provider value={props}>
      <VouchersHeader />
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
    </VouchersTableContext.Provider>
  )
}
