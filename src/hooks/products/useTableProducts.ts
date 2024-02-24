import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { Product } from '@/types/product'
import { DataResponse } from '@/types/react-query'

export type ProductResponse = {
  data: Product[]
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

export default function useTableProduct() {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState<SearchProductTableProps>(
    {} as SearchProductTableProps
  )
  const [products, setProducts] = useState<Product['productId'][]>([])

  const axios = useAxiosPrivate()

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['products-table', { currentPage, pageSize: perPage, ...filter }],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as {
        currentPage: number
        pageSize: number
      } & SearchProductTableProps

      const res: DataResponse<unknown> = await axios.get(
        '/product-service/api/v1/products/admin',
        {
          params: {
            ...filter,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as ProductResponse
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
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

  const onResetFilter = () => {
    setFilter({} as SearchProductTableProps)
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
