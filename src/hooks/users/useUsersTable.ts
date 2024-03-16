import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { USER_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'
import { User, UserRole } from '@/types/user'

export type UsersResponse = {
  data: User[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchUsersTableProps = {
  search: string
  role: UserRole
}

export default function useUsersTable() {
  const axios = useAxiosPrivate()

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchUsersTableProps>(
    {} as SearchUsersTableProps
  )

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['get-users', { currentPage, pageSize: perPage, ...filter }],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchUsersTableProps

      const res: DataResponse<unknown> = await axios.get(
        `${USER_SERVICE}/users/admins`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as UsersResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchUsersTableProps) => {
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
    setFilter({} as SearchUsersTableProps)
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
