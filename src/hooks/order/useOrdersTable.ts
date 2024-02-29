import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { ORDER_SERVICE } from '@/libs/micro-service'
import { Order } from '@/types/order'
import { DataResponse } from '@/types/react-query'

export type OrderTableResponse = {
  data: Order[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchOrdersTableProps = {
  storeId: number
  startDate?: string
  endDate?: string
}

export default function useOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchOrdersTableProps>(
    {} as SearchOrdersTableProps
  )

  const axios = useAxiosPrivate()

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['orders-table', { currentPage, pageSize: perPage, ...filter }],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchOrdersTableProps

      const res: DataResponse<unknown> = await axios.get(
        `${ORDER_SERVICE}/orders/admin`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as OrderTableResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchOrdersTableProps) => {
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
    setFilter({} as SearchOrdersTableProps)
  }

  return {
    isError,
    isLoading,
    isFetching,
    data: data?.data ?? [],
    refetch,
    filter,
    onSearch,
    onPageChange,
    onPerPageChange,
    onResetFilter,
    total: data?.total ?? 0,
    currentPage,
  }
}
