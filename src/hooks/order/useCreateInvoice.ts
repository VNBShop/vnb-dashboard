import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { ORDER_SERVICE } from '@/libs/micro-service'
import { Product } from '@/types/product'
import { DataError, DataResponse } from '@/types/react-query'

export type CreateInvoicePayload = {
  firstName: string
  phone: string
  products: {
    quantity: number
    productSizeId: number
  }[]
}

export default function useCreateInvoice() {
  const axios = useAxiosPrivate()

  const { isPending, mutate } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateInvoicePayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${ORDER_SERVICE}/orders/offline`, payload)
    },
    onSuccess: (response) => {
      if (response?.data?.success) {
      }
    },
    onError: (error) => {
      if (error) {
        toast.error(
          (error?.response?.data?.metadata as string) ?? 'Server error'
        )
      }
    },
  })
  return {
    loading: isPending,
    onCreate: mutate,
  }
}
