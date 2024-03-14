import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { USER_SERVICE } from '@/libs/micro-service'
import { Shipper } from '@/types/order'
import { DataError, DataResponse } from '@/types/react-query'

export type DeleteShipperPayload = {
  shipperId: Shipper['shipperId']
}

type IProps = {
  onSuccess: () => void
}
export default function useDeleteShipper({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    DeleteShipperPayload
  >({
    mutationFn: async (payload) => {
      return await axios.delete(
        `${USER_SERVICE}/shippers/${payload?.shipperId}`
      )
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-shippers'],
        })

        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          'Cant not delete this shipper!'
      )
    },
  })
  return {
    onDeleteShipper: mutate,
    loading: isPending,
  }
}
