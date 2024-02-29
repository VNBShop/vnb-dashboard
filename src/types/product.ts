export type Product = {
  productId: number
  productName: string
  productImages: {
    productAssetId: string
    productAssetUrl: string
  }[]
  productSizeAndStockResponses: {
    productSizeId: number
    productSize: string
    productStock: number
  }[]
  productSubCategory: {
    subCategoryId: number
    subCategoryName: string
  }
  productBrand: {
    brandId: number
    brandName: string
  }
  productDetail: {
    [key: string]: string | number
  }
  productPrice: number
  productStatus: boolean
}
