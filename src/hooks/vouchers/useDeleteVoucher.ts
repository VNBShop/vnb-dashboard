import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { ORDER_SERVICE } from '@/libs/micro-service'
import { Voucher } from '@/types/order'
import { DataError, DataResponse } from '@/types/react-query'

type IProps = {
  onSucess: () => void
}

export default function useDeleteVoucher({ onSucess }: IProps) {
  const axios = useAxiosPrivate()

  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    { voucherId: Voucher['voucherId'] }
  >({
    mutationFn: async (payload) => {
      return await axios.delete(
        `${ORDER_SERVICE}/vouchers/${payload?.voucherId}`
      )
    },
    async onSuccess(response) {
      if (response?.data?.success) {
        toast.success(`Delete voucher successfully`)
        await client.invalidateQueries({
          queryKey: ['get-vouchers'],
        })
        onSucess()
      }
    },
    onError(err) {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          `Cant not delete this order!`
      )
    },
  })

  return {
    onDeleteVoucher: mutate,
    loading: isPending,
  }
}
