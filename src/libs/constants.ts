import { OrderedStatus } from '@/types/order'
import { UserRole } from '@/types/user'

export type ROLE = 'ADMIN' | 'USER' | 'STORE_OWNER' | 'STORE_MEMBER'

export const sidebarList = [
  {
    name: '',
    sub: [
      {
        label: 'Home',
        icon: 'Dashboard',
        url: '/',
        scopes: ['STORE_MEMBER', 'STORE_OWNER', 'ADMIN'] as ROLE[],
      },
    ],
  },
  {
    name: 'Bussiness',
    sub: [
      {
        label: 'Invoice order',
        icon: 'Selling',
        url: '/invoice-order',
        scopes: ['STORE_MEMBER', 'STORE_OWNER'] as ROLE[],
      },
      {
        label: 'Orders',
        icon: 'Orders',
        url: '/all-ordered',
        scopes: ['STORE_MEMBER', 'STORE_OWNER', 'ADMIN'] as ROLE[],
      },
    ],
  },
  {
    name: 'Warehouse',
    sub: [
      {
        label: 'Stock',
        icon: 'Stock',
        url: '/products-warehouse',
        scopes: ['ADMIN'] as ROLE[],
      },
      {
        label: 'History',
        icon: 'WarehouseHistory',
        url: '/warehouse-history/imported',
        scopes: ['STORE_MEMBER', 'STORE_OWNER', 'ADMIN'] as ROLE[],
      },
    ],
  },
  {
    name: 'Stock',
    sub: [
      {
        label: 'Products',
        icon: 'Products',
        url: '/products',
        scopes: ['ADMIN'] as ROLE[],
      },
      {
        label: 'Stores',
        icon: 'Stores',
        url: '/stores',
        scopes: ['ADMIN'] as ROLE[],
      },
    ],
  },
  {
    name: 'Delivery',
    sub: [
      {
        label: 'Shipper',
        icon: 'Products',
        url: '/shipper',
        scopes: ['ADMIN'] as ROLE[],
      },
    ],
  },
  {
    name: 'User',
    sub: [
      {
        label: 'User',
        icon: 'Users',
        url: '/users',
        scopes: ['ADMIN'] as ROLE[],
      },
    ],
  },
]

export const brands = [
  {
    brandId: 1,
    brandName: 'Victor',
  },
  {
    brandId: 2,
    brandName: 'Yonex',
  },
  {
    brandId: 3,
    brandName: 'RSL',
  },
  {
    brandId: 4,
    brandName: 'Carlton',
  },
  {
    brandId: 5,
    brandName: 'Bad M',
  },
  {
    brandId: 6,
    brandName: 'Fz Forza',
  },
  {
    brandId: 7,
    brandName: 'Dunlop',
  },
  {
    brandId: 8,
    brandName: 'Babolat',
  },
  {
    brandId: 9,
    brandName: 'Adidas',
  },
  {
    brandId: 10,
    brandName: 'Slazenger',
  },
  {
    brandId: 71,
    brandName: 'Mizuno',
  },
  {
    brandId: 12,
    brandName: 'Badminton Nederland',
  },
  {
    brandId: 13,
    brandName: 'Kawasaki',
  },
  {
    brandId: 15,
    brandName: 'Nike',
  },
  {
    brandId: 17,
    brandName: 'Puma',
  },
]

export const categories = [
  {
    categoryName: 'Badminton',
    subCategories: [
      {
        subCategoryId: 1,
        subCategoryName: 'Badminton Rackets',
      },
      {
        subCategoryId: 2,
        subCategoryName: 'Badminton Bags',
      },
      {
        subCategoryId: 3,
        subCategoryName: 'Badminton Clothes',
      },
      {
        subCategoryId: 4,
        subCategoryName: 'Badminton Shoes',
      },
      {
        subCategoryId: 5,
        subCategoryName: 'Badminton Shuttlecocks',
      },
    ],
  },
  {
    categoryName: 'Football',
    subCategories: [
      {
        subCategoryId: 6,
        subCategoryName: 'Football Balls',
      },
      {
        subCategoryId: 7,
        subCategoryName: 'Football GK Gloves',
      },
      {
        subCategoryId: 8,
        subCategoryName: 'Football Guards',
      },
      {
        subCategoryId: 9,
        subCategoryName: 'Football Shoes',
      },
      {
        subCategoryId: 10,
        subCategoryName: 'Football Socks',
      },
    ],
  },
  {
    categoryName: 'Basketball',
    subCategories: [
      {
        subCategoryId: 11,
        subCategoryName: 'Basketball Balls',
      },
      {
        subCategoryId: 12,
        subCategoryName: 'Basketball Shoes',
      },
      {
        subCategoryId: 13,
        subCategoryName: 'Basketball Sweats',
      },
    ],
  },
]

export const colorsOrderedStatus: Record<
  OrderedStatus,
  {
    color: string
    backgroundColor: string
  }
> = {
  CANCELLED: {
    color: '#fa4515',
    backgroundColor: '#ffe4d5',
  },
  DELIVER_FAILED: {
    backgroundColor: '#fceae7',
    color: '#aa2629',
  },
  DELIVERING: {
    color: '#492E87',
    backgroundColor: '#e0dfff',
  },
  PENDING: {
    color: '#ca8d04',
    backgroundColor: '#fefac3',
  },
  RE_DELIVERING: {
    color: '#773f17',
    backgroundColor: '#fdf3d7',
  },
  SUCCESS: {
    color: '#5d8e22',
    backgroundColor: '#e9f5d2',
  },
}

export const orderedStatusOption: {
  label: string
  value: OrderedStatus
}[] = [
  {
    label: 'Success',
    value: 'SUCCESS',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Delivering',
    value: 'DELIVERING',
  },
  {
    label: 'Re delivering',
    value: 'RE_DELIVERING',
  },
  {
    label: 'Failed',
    value: 'DELIVER_FAILED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
]

export const userRoleOptions: {
  label: string
  value: UserRole
}[] = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'User',
    value: 'USER',
  },
  {
    label: 'Store owner',
    value: 'STORE_OWNER',
  },
  {
    label: 'Store member',
    value: 'STORE_MEMBER',
  },
  {
    label: 'Shipper',
    value: 'SHIPPER',
  },
]
