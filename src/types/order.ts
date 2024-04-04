import { Store } from './store'

export type Order = {
  createdAt: Date
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
  customerPhone: string
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

export type Shipper = {
  shipperId: number
  email: string
  firstName: string
  lastName: string
  phone: string
  status: boolean
  avatar: string
  idNumber: string
}

export type Voucher = {
  voucherId: number
  voucherCode: string
  maxDiscount: number
  voucherPercent: number
  startedAt: Date
  expiredAt: Date
  quantity: number
}
