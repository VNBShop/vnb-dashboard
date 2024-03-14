import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { USER_SERVICE } from '@/libs/micro-service'
import { Shipper } from '@/types/order'
import { DataResponse } from '@/types/react-query'

export type ShipperResponse = {
  data: Shipper[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchShipperTableProps = {
  search: string
}

export default function useShipperTable() {
  const axios = useAxiosPrivate()

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchShipperTableProps>(
    {} as SearchShipperTableProps
  )

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['get-shippers', { currentPage, pageSize: perPage, ...filter }],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchShipperTableProps

      const res: DataResponse<unknown> = await axios.get(
        `${USER_SERVICE}/shippers`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as ShipperResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchShipperTableProps) => {
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
    setFilter({} as SearchShipperTableProps)
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
