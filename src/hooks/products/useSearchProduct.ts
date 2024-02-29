import { useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { PRODUCT_SERVICE } from '@/libs/micro-service'

import { DataResponse } from '@/types/react-query'

import { ProductResponse } from './useProductsTable'

import { useDebounce } from '../useDebounce'

export default function useSearchProduct() {
  const queryClient = useQueryClient()
  const axios = useAxiosPrivate()
  const [search, setSearch] = useState('')

  const searchVal = useDebounce(search)

  const { data, isPending, isFetching, isLoading, isError } = useQuery({
    queryKey: ['search-product', searchVal],
    queryFn: async ({ queryKey }) => {
      const res: DataResponse<unknown> = await axios.get(
        `${PRODUCT_SERVICE}/products/admin`,
        {
          params: {
            search: queryKey[1],
            currentPage: 1,
            pageSize: 7,
          },
        }
      )

      if (res?.data.success) {
        return res?.data?.metadata as ProductResponse
      } else {
        throw new Error('')
      }
    },
    enabled: !!searchVal,
    refetchOnWindowFocus: false,
  })

  const onSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    if (!search)
      queryClient.removeQueries({
        exact: true,
        queryKey: 'search-product' as unknown as readonly unknown[],
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return {
    data: data?.data,
    isFetching,
    isPending,
    isLoading,
    isError,
    search,
    onSearch,
  }
}
