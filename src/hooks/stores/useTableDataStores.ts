import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { DataResponse } from '@/types/react-query'

import { Store } from '@/types/store'

export type StoresResponse = {
  data: Store[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchProductTableProps = {
  search: string
  brandIds: string
  storeIds: string
  category: string
  startDate?: string
  endDate?: string
}

type IProps = {
  isExport?: boolean
}

export default function useTableDataStores({ isExport }: IProps) {
  const axios = useAxiosPrivate()

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchProductTableProps>(
    {} as SearchProductTableProps
  )

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [
      'products-stores',
      { currentPage, pageSize: perPage, ...filter },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchProductTableProps

      const res: DataResponse<unknown> = await axios.get(
        '/store-service/api/v1/stores/admin',
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as StoresResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
    enabled: isExport,
  })

  const onSearch = (values: SearchProductTableProps) => {
    setFilter(values)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPerPageChange = (_perPage: number, page: number) => {
    setCurrentPage(page)
    setPerPage(_perPage)
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
  }
}
