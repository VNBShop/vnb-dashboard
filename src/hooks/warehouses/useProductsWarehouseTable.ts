import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { Product } from '@/types/product'
import { DataResponse } from '@/types/react-query'

export type ProductsWarehouseResponse = {
  data: Product[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export type SearchProductWarehouseTableProps = {
  search: string
  brandIds: string
  storeIds: string
  category: string
  startDate?: string
  endDate?: string
}

export default function useProductsWarehouseTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchProductWarehouseTableProps>(
    {} as SearchProductWarehouseTableProps
  )
  const [products, setProducts] = useState<Product['productId'][]>([])

  const axios = useAxiosPrivate()

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [
      'products-warehouse-table',
      { currentPage, pageSize: perPage, ...filter },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchProductWarehouseTableProps

      const res: DataResponse<unknown> = await axios.get(
        '/product-service/api/v1/warehouses/admin',
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as ProductsWarehouseResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onSearch = (values: SearchProductWarehouseTableProps) => {
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
    setFilter({} as SearchProductWarehouseTableProps)
  }

  return {
    data,
    isError,
    perPage,
    isLoading,
    isFetching,
    currentPage,
    productSelected: products,
    onSearch,
    onPageChange,
    onPerPageChange,
    refetch,
    setProducts,
    onResetFilter,
  }
}
