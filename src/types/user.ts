export type Admin = {
  adminId: number
  adminName: string
}

export type User = {
  userId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  avatar: string
  roles: UserRole[]
  isActive: boolean
}

export type UserRole =
  | 'ADMIN'
  | 'USER'
  | 'STORE_OWNER'
  | 'STORE_MEMBER'
  | 'SHIPPER'
