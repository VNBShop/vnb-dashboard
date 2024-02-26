'use client'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { PRODUCT_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'

export type WarehouseExportedResponse = {
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

export type WarehouseExportedFilter = {
  actorId: number | string
  importTo: number
  productId: number
  startDate: string
  endDate: string
}

export default function useTableWarehouseExported() {
  const axios = useAxiosPrivate()
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<WarehouseExportedFilter>(
    {} as WarehouseExportedFilter
  )
  const { data, refetch, isFetching, isError, isLoading } = useQuery({
    queryKey: [
      'warehouse-exported',
      { currentPage, pageSize: perPage, ...filter },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & WarehouseExportedFilter

      const res: DataResponse<unknown> = await axios.get(
        `${PRODUCT_SERVICE}/warehouse-orders/exports`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as WarehouseExportedResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: WarehouseExportedFilter) => {
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
    setFilter({} as WarehouseExportedFilter)
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
