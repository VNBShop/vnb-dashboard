import { useState } from 'react'

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { ImageCloudinaryProps } from '@/components/ui/upload-file'

import { Product } from '@/types/product'
import { DataError, DataResponse } from '@/types/react-query'

import { ProductResponse } from './useTableProducts'

export type CreateProductProps = {
  productName: string
  productSizes: string[]
  productPrice: number
  productSubCategory: number
  productBrand: number
  productAssets: ImageCloudinaryProps[]
  productDetails: {
    [key: string]: string | number
  }
}

export type UpdateProductProps = Omit<CreateProductProps, 'productSizes'> & {
  updatedProductSizes?: {
    productSizeId: number
    productSize: string
  }[]
  addedProductSizes?: string[]
  deletedProductSizes?: number[]
  productId: Product['productId']
}

type IProps = {
  onCloseModal: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
  isUpdate?: boolean
}

export default function useProductAction({
  onCloseModal,
  refetch,
  isUpdate,
}: IProps) {
  const axios = useAxiosPrivate()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateProductProps | UpdateProductProps,
    unknown
  >({
    mutationFn: async (data) => {
      const res = isUpdate
        ? await axios.put(
            `/product-service/api/v1/products/${(data as UpdateProductProps)
              ?.productId}`,
            {
              ...data,
            }
          )
        : await axios.post('/product-service/api/v1/products', {
            ...data,
          })

      return res
    },
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success(
          response?.data?.metadata?.message ??
            `${isUpdate ? 'Update' : 'Create'} product successfully!`
        )
        onCloseModal()
        refetch()
      }
    },
    onError(error) {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Some thing went wrong!'
      )
    },
  })

  return {
    loading: isPending,
    onActionProduct: mutate,
  }
}
