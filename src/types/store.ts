export type Store = {
  storeId: number
  storeName: string
  storeOwnerName: string
  storeOwnerEmail: string
  storeOwnerPhone: string
  storeAddress: string
  storeEmail: string
  storePhone: string
  status: boolean
}

export type StoreSingle = Pick<Store, 'storeId' | 'storeName'>
