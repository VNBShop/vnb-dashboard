import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { useUsersTableContext } from '@/contexts/users-table'
import { FORUM_SERVICE, USER_SERVICE } from '@/libs/micro-service'
import { Shipper } from '@/types/order'
import { DataError, DataResponse } from '@/types/react-query'
import { Report, User } from '@/types/user'

export type DeleteShipperPayload = {
  reportId: Report['postReportId']
  type: 'reject' | 'approve'
}

type IProps = {
  onSuccess: () => void
}
export default function useHandleReportPost({ onSuccess }: IProps) {
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
        `${FORUM_SERVICE}/post-reports/${payload?.reportId}/${payload?.type}`
      )
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-posts-report'],
        })

        toast.success(
          `${payload?.type === 'approve' ? 'Approve' : 'Reject'} successfully!`
        )

        onSuccess()
      }
    },
    onError: (err, payload) => {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          `Cant not ${payload?.type} this post!`
      )
    },
  })
  return {
    onHandleReportPost: mutate,
    loading: isPending,
  }
}
