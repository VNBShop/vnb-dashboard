export type Product = {
  productId: number
  productName: string
  productImages: {
    productAssetId: string
    productAssetUrl: string
  }[]
  productSizes: {
    productSizeId: number
    productSize: string
  }[]
  productSubCategory: {
    subCategoryId: number
    subCategoryName: string
  }[]
  productBrand: {
    brandId: number
    brandName: string
  }[]
  productDetail: {
    [key: string]: string | number
  }
  productPrice: number
  productStatus: boolean
}
