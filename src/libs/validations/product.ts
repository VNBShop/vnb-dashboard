import { z } from 'zod'

export const CreateProductSchema = z.object({
  productName: z.string().min(1, {
    message: 'Please enter product name',
  }),
  productPrice: z.string().min(1, {
    message: 'Please enter product price',
  }),
  productBrand: z.string().min(1, {
    message: 'Please choose product brand',
  }),
})

export const SizeImportSchema = z.object({
  stock: z.string().min(1, {
    message: 'Please enter stock amount',
  }),
})

export const SizeExportSchema = z.object({
  stock: z.string().min(1, {
    message: 'Please enter stock amount',
  }),
  storeId: z.string().min(1, {
    message: 'Please choose store to export',
  }),
})
