'use client'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Session } from 'next-auth'

import useAxiosPrivate from '@/api/private/useAxios'
import { PRODUCT_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'

import useGetWarehouseFilter from '../common/useGetWarehouseFilter'

export type WarehouseImportedResponse = {
  data: [
    {
      importFrom: string
      importTo: string
      productName: string
      productSize: string
      quantity: number
      actorName: string
      createdAt: unknown
    },
  ]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type WarehouseImportedFilter = {
  actorId?: number
  productId?: number
  startDate?: string
  endDate?: string
}

type IProps = {
  user: Session['user']
}

export default function useTableWarehouseImported({ user }: IProps) {
  const axios = useAxiosPrivate()
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<WarehouseImportedFilter>(
    {} as WarehouseImportedFilter
  )
  const { data, refetch, isFetching, isError, isLoading } = useQuery({
    queryKey: [
      'warehouse-imported',
      { currentPage, pageSize: perPage, ...filter },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & WarehouseImportedFilter

      const res: DataResponse<unknown> = user?.roles?.includes('ADMIN')
        ? await axios.get(`${PRODUCT_SERVICE}/warehouse-orders/imports/admin`, {
            params: {
              ...filter,
            },
          })
        : await axios.get(`${PRODUCT_SERVICE}/warehouse-orders/imports`, {
            params: {
              ...filter,
            },
          })

      if (res?.data.success) {
        return res?.data?.metadata as WarehouseImportedResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const { admins } = useGetWarehouseFilter()

  const onSearch = (values: WarehouseImportedFilter) => {
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
    setFilter({} as WarehouseImportedFilter)
  }

  return {
    data,
    isError,
    perPage,
    isLoading,
    isFetching,
    currentPage,
    admins,
    onSearch,
    onPageChange,
    onPerPageChange,
    refetch,
    onResetFilter,
  }
}
