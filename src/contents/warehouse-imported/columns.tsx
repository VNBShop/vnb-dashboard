import { format } from 'date-fns'
import dayjs from 'dayjs'
import { TableColumn } from 'react-data-table-component'

import { WareHouseImported } from '@/types/warehouse'

export default function genColumns() {
  const columns: TableColumn<WareHouseImported>[] = [
    {
      name: 'Time',
      cell(row) {
        if (!row?.createdAt) return '-'
        return dayjs(row.createdAt as unknown as Date).format(
          'HH:mm dd/MM/yyyy'
        )
      },
    },
    {
      name: 'Name',
      cell(row) {
        if (!row?.productName) return '-'
        return row.productName
      },
    },
    {
      name: 'Actor',
      cell(row) {
        if (!row?.actorName) return '-'
        return row?.actorName
      },
    },
    {
      name: 'Name size',
      cell(row) {
        if (!row?.productSize) return '-'
        return row?.productSize
      },
    },
    {
      name: 'Quantity',
      cell(row) {
        if (!row?.quantity) return '-'
        return row?.quantity
      },
    },
    {
      name: 'Import from',
      cell(row) {
        if (!row?.importFrom) return '-'
        return row.importFrom
      },
    },
    {
      name: 'Import to',
      cell(row) {
        if (!row?.importTo) return '-'
        return row.importTo
      },
    },
  ]

  return columns
}
