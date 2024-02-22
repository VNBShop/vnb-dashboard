import { RefObject } from 'react'

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { ModalProps } from '@/components/ui/modal'
import { Product } from '@/types/product'
import { DataResponse, DataError } from '@/types/react-query'

import { ProductResponse } from './useTableDataProduct'

type DeactivatesProps = {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
  modalRef: RefObject<ModalProps>
}

export default function useDeactives({ modalRef, refetch }: DeactivatesProps) {
  const axios = useAxiosPrivate()
  const { mutate: onDeactive, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    Product['productId'][]
  >({
    mutationFn: (_data) => {
      const res = axios.post(
        `/product-service/api/v1/products/admin/delete-patch`,
        [..._data]
      )
      return res
    },

    onSuccess: (response, data) => {
      if (response?.data?.success) {
        toast.success(
          response?.data?.metadata?.message ??
            `Deactivate ${data?.length} products successfully!`
        )
        if (!!modalRef.current) {
          modalRef.current.onClose()
        }

        refetch()
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Some thing went wrong!'
      )
    },
  })

  return {
    onDeactive,
    loading: isPending,
  }
}
