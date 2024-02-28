import { Product } from '@/types/product'

export type CreateInvoicePayload = {
  email: string
  firstName: string
  lastName: string
  products: (Pick<Product, 'productId'> & {
    quantity: number
  })[]
}

export default function useCreateInvoice() {
  return {}
}
