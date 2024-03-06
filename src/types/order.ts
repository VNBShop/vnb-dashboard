import { Store } from './store'

export type Order = {
  orderId: number
  customer: Customer
  store: Store
  orderStatus: string
  paymentType: string
  totalPrice: number
  products: OrderProduct[]
  orderDate: Date
}

export type Customer = {
  customerId: number
  customerName: string
}

export type OrderProduct = {
  productId: number
  productName: string
  productSizeId: number
  productSizeName: string
  quantity: number
  priceUnit: number
  productImage: string
}

export type OrderedStatus =
  | 'PENDING'
  | 'CANCELLED'
  | 'DELIVERING'
  | 'RE_DELIVERING'
  | 'SUCCESS'
  | 'DELIVER_FAILED'
