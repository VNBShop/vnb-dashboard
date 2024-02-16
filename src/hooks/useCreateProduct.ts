import { useMutation } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import { ImageCloudinaryProps } from '@/components/ui/upload-file'
import { DataError, DataResponse } from '@/types/react-query'

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

export default function useCreateProduct() {
  const axios = useAxiosPrivate()
  const router = useRouter()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    CreateProductProps,
    unknown
  >({
    mutationFn: async (data) => {
      const res = await axios.post('/product-service/api/v1/products', {
        ...data,
      })

      return res
    },
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success(
          response?.data?.metadata?.message ?? 'Create product successfully!'
        )
        router.back()
      }
    },
    onError(error) {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Some thing went wrong!'
      )
    },
  })

  return {
    onCreateProduct: mutate,
    loading: isPending,
  }
}
