import { Product } from './product'

export type ProductWarehouse = Pick<Product, 'productId' | 'productName'> & {
  productImages: string[]
  productIsHaveSize: boolean
  productSizeAndStockResponses: ProductWarehouseSizeStock[]
}

export type ProductWarehouseSizeStock = {
  productStockSizeId: number
  productStockSize: string
  productStockQuantity: number
}

export type WareHouseImported = {
  importFrom: string
  importTo: string
  productName: string
  productSize: string
  quantity: number
  actorName: string
  createdAt: string
}
