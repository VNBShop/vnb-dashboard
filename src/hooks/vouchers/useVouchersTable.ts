import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { FORUM_SERVICE, ORDER_SERVICE } from '@/libs/micro-service'
import { Voucher } from '@/types/order'
import { DataResponse } from '@/types/react-query'

export type VouchersResponse = {
  data: Voucher[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchVouchersTableProps = {
  voucherCode: string
  startDate?: string
  endDate?: string
}

export default function useVouchersTable() {
  const axios = useAxiosPrivate()

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchVouchersTableProps>(
    {} as SearchVouchersTableProps
  )

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['get-vouchers', { currentPage, pageSize: perPage, ...filter }],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchVouchersTableProps

      const res: DataResponse<unknown> = await axios.get(
        `${ORDER_SERVICE}/vouchers`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as VouchersResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchVouchersTableProps) => {
    setFilter(values)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPerPageChange = (_perPage: number, page: number) => {
    setCurrentPage(page)
    setPerPage(_perPage)
  }

  const onResetFilter = () => {
    setFilter({} as SearchVouchersTableProps)
  }

  return {
    data,
    isError,
    perPage,
    isLoading,
    isFetching,
    currentPage,
    onSearch,
    onPageChange,
    onPerPageChange,
    refetch,
    onResetFilter,
  }
}
