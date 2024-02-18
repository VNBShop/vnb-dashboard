import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { DataError, DataResponse } from '@/types/react-query'

import { ProductResponse } from './useTableDataProduct'

export type CreateStoreProps = {
  storeName: string
  storeAddress: string
  storePhone: string
  storeEmail: string
  storeOwnerEmail: string
}

type UseCreateStoreProps = {
  onCloseModal: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
}

export default function useCreateStore({
  onCloseModal,
  refetch,
}: UseCreateStoreProps) {
  const axios = useAxiosPrivate()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateStoreProps,
    unknown
  >({
    mutationFn: async (data) => {
      const res = await axios.post('/store-service/api/v1/stores', {
        ...data,
      })

      return res
    },
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success(
          response?.data?.metadata?.message ?? 'Create store successfully!'
        )
        onCloseModal()
        refetch()
      }
    },
    onError(error) {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Some thing went wrong!'
      )
    },
  })

  return {
    loading: isPending,
    onCreateProduct: mutate,
  }
}
