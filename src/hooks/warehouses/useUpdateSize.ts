import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { PRODUCT_SERVICE } from '@/libs/micro-service'
import { DataError, DataResponse } from '@/types/react-query'

import { ProductsWarehouseResponse } from './useTableProductsWarehouse'

export type UpdateSizePayload = {
  productSizeId: number
  stock: number
  storeId?: number
}

type IProps = {
  onClose: () => void
  isExport?: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductsWarehouseResponse, Error>>
}

export default function useUpdateSize({ onClose, refetch, isExport }: IProps) {
  const axios = useAxiosPrivate()
  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    UpdateSizePayload
  >({
    mutationFn: async (data) => {
      return isExport
        ? axios.post(
            `${PRODUCT_SERVICE}/warehouses/admin/export-warehouse`,
            data
          )
        : axios.post(
            `${PRODUCT_SERVICE}/warehouses/admin/import-warehouse`,
            data
          )
    },
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(
          response?.data?.metadata?.message ??
            `${
              isExport ? 'Export' : 'Import'
            } product from warehouse successfully!`
        )
        refetch()
        onClose()
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Update quantity failed!'
      )
    },
  })
  return {
    onUpdate: mutate,
    loading: isPending,
  }
}
