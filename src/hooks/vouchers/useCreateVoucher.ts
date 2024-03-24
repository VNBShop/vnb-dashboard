import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { CreateVoucherFormInput } from '@/components/form/create-voucher'
import { ORDER_SERVICE } from '@/libs/micro-service'
import { Voucher } from '@/types/order'
import { DataError, DataResponse } from '@/types/react-query'

type IProps = {
  onSucess: () => void
  vourcherId?: Voucher['voucherId']
}

export default function useCreateVoucher({ onSucess, vourcherId }: IProps) {
  const axios = useAxiosPrivate()

  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateVoucherFormInput
  >({
    mutationFn: async (payload) => {
      return (await !!vourcherId)
        ? axios.put(`${ORDER_SERVICE}/vouchers/${vourcherId}`, payload)
        : axios.post(`${ORDER_SERVICE}/vouchers`, payload)
    },
    async onSuccess(response) {
      if (response?.data?.success) {
        toast.success(
          `${!!vourcherId ? 'Update' : 'Create'} voucher successfully`
        )
        await client.invalidateQueries({
          queryKey: ['get-vouchers'],
        })
        onSucess()
      }
    },
    onError(err) {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          `Cant not ${!!vourcherId ? 'update' : 'create'} order`
      )
    },
  })

  return {
    onCreateVoucher: mutate,
    loading: isPending,
  }
}
