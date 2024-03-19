import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { FORUM_SERVICE, USER_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'
import { Report, User, UserRole } from '@/types/user'

export type ReportsResponse = {
  data: Report[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchReportsTableProps = {
  startDate?: string
  endDate?: string
}

export default function useReportsTable() {
  const axios = useAxiosPrivate()

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchReportsTableProps>(
    {} as SearchReportsTableProps
  )

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [
      'get-posts-report',
      { currentPage, pageSize: perPage, ...filter },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchReportsTableProps

      const res: DataResponse<unknown> = await axios.get(
        `${FORUM_SERVICE}/post-reports`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as ReportsResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchReportsTableProps) => {
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
    setFilter({} as SearchReportsTableProps)
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
