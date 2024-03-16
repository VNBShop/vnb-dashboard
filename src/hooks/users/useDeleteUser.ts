import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { useUsersTableContext } from '@/contexts/users-table'
import { USER_SERVICE } from '@/libs/micro-service'
import { Shipper } from '@/types/order'
import { DataError, DataResponse } from '@/types/react-query'
import { User } from '@/types/user'

export type DeleteShipperPayload = {
  userId: User['userId']
}

type IProps = {
  onSuccess: () => void
}
export default function useDeleteUser({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const {} = useUsersTableContext()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    DeleteShipperPayload
  >({
    mutationFn: async (payload) => {
      return await axios.put(
        `${USER_SERVICE}/users/deactivate/${payload?.userId}/admin`
      )
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-users'],
        })

        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          'Cant not deactivate this user!'
      )
    },
  })
  return {
    onDeactivateUser: mutate,
    loading: isPending,
  }
}
