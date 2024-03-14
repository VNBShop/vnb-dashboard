import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { z } from 'zod'

import useAxiosPrivate from '@/api/private/useAxios'
import { USER_SERVICE } from '@/libs/micro-service'
import { shipperShema } from '@/libs/validations/shipper'
import { DataError, DataResponse } from '@/types/react-query'

export type CreateShipperPayload = z.infer<typeof shipperShema>

type IProps = {
  onSuccess: () => void
}
export default function useAddShipper({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateShipperPayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${USER_SERVICE}/shippers`, payload)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: ['get-shippers'],
        })

        toast.success('Add shipper success!')

        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          'Cant not add this shipper!'
      )
    },
  })
  return {
    onAddShipper: mutate,
    loading: isPending,
  }
}
