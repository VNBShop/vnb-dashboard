'use client'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { PRODUCT_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'

export type WarehouseImporteResponse = {
  data: [
    {
      importFrom: 'string'
      importTo: 'string'
      productName: 'string'
      productSize: 'string'
      quantity: 0
      actorName: 'string'
      createdAt: '2024-02-24T14:05:29.668Z'
    },
  ]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type WarehouseImportedFilter = {
  actorId: number
  productId: number
  startDate: string
  endDate: string
}
export default function useTableWarehouseImported() {
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

      const res: DataResponse<unknown> = await axios.get(
        `${PRODUCT_SERVICE}/warehouse-orders/import`,
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as WarehouseImporteResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

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
    onSearch,
    onPageChange,
    onPerPageChange,
    refetch,
    onResetFilter,
  }
}
