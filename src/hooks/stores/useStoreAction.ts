import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { DataError, DataResponse } from '@/types/react-query'

import { StoresResponse } from './useStoresTable'

import { ProductResponse } from '../products/useTableProducts'

export type CreateStoreProps = {
  storeName: string
  storeAddress: string
  storePhone: string
  storeEmail: string
  storeOwnerEmail: string
}

export type UpdateStoreProps = CreateStoreProps & {
  storeId: number
}

type UseStoreActionProps = {
  onCloseModal: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<StoresResponse, Error>>
  isUpdate?: boolean
}

export default function useStoreAction({
  onCloseModal,
  refetch,
  isUpdate,
}: UseStoreActionProps) {
  const axios = useAxiosPrivate()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateStoreProps | UpdateStoreProps
  >({
    mutationFn: async (data) => {
      const res = isUpdate
        ? await axios.put(
            `/store-service/api/v1/stores/${(data as UpdateStoreProps)
              ?.storeId}`,
            {
              ...data,
            }
          )
        : await axios.post('/store-service/api/v1/stores', {
            ...data,
          })

      return res
    },
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success(
          response?.data?.metadata?.message ??
            `${isUpdate ? 'Update' : 'Create'} store successfully!`
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
    onStoreAction: mutate,
  }
}
