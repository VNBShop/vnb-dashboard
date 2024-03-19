import { useQueries } from '@tanstack/react-query'

import axios from 'axios'

import useAxiosPrivate from '@/api/private/useAxios'
import {
  ORDER_SERVICE,
  PRODUCT_SERVICE,
  USER_SERVICE,
} from '@/libs/micro-service'
import { DataResponse } from '@/types/react-query'

type UserRes = {
  totalUsers: number
  userPercentage: number
}

type OrderRes = {
  totalOrder: number
  orderPercentage: number
  totalSales: number
  salesPercentage: number
}

type ProductRes = {
  importPrice: number
  importPercentages: number
}

export type OrderChart = {
  monthYear: string
  basketball: number
  football: number
  badminton: number
}

export default function useDashboard() {
  const axios = useAxiosPrivate()

  const res = useQueries({
    queries: [
      {
        queryKey: ['user-dashboard'],
        queryFn: async () => {
          const res: DataResponse<UserRes> = await axios.get(
            `${USER_SERVICE}/dashboards/admin`
          )

          return res?.data?.metadata ?? null
        },
      },
      {
        queryKey: ['order-dashboard'],
        queryFn: async () => {
          const res: DataResponse<OrderRes> = await axios.get(
            `${ORDER_SERVICE}/dashboards/admin`
          )

          return res?.data?.metadata ?? null
        },
      },
      {
        queryKey: ['product-dashboard'],
        queryFn: async () => {
          const res: DataResponse<ProductRes> = await axios.get(
            `${PRODUCT_SERVICE}/dashboards/admin`
          )

          return res?.data?.metadata ?? null
        },
      },
      {
        queryKey: ['order-chart'],
        queryFn: async () => {
          const res: DataResponse<OrderChart[]> = await axios.get(
            `${ORDER_SERVICE}/orders/dashboard/chart`
          )

          return res?.data?.metadata ?? null
        },
      },
    ],
  })

  return {
    user: (res?.[0]?.data ?? {}) as UserRes,
    order: (res?.[1]?.data ?? {}) as OrderRes,
    product: (res?.[2]?.data ?? {}) as ProductRes,
    orderChats: (res?.[3]?.data ?? []) as OrderChart[],
  }
}
