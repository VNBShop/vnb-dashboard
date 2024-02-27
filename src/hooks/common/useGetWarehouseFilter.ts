import { useQueries } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/useAxios'
import { STORE_SERVICE, USER_SERVICE } from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'
import { StoreSingle } from '@/types/store'
import { Admin } from '@/types/user'

export default function useGetWarehouseFilter() {
  const axios = useAxiosPrivate()

  const result = useQueries({
    queries: [
      {
        queryKey: ['get-all-stores'],
        queryFn: async () => {
          const res = await axios.get(`${STORE_SERVICE}/stores`)

          if (res?.data?.success) {
            return res?.data?.metadata as StoreSingle[]
          } else {
            throw new Error('')
          }
        },
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['get-all-actors'],
        queryFn: async () => {
          const res: DataResponse<unknown> = await axios.get(
            `${USER_SERVICE}/users/admins`
          )

          if (res?.data?.success) {
            return res?.data?.metadata as Admin[]
          } else {
            throw new Error('')
          }
        },
        refetchOnWindowFocus: false,
      },
    ],
  })

  const stores = result[0]?.data ?? []
  const admins = result[1]?.data ?? []

  return {
    stores,
    admins,
  }
}
