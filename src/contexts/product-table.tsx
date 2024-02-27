'use client'
import { createContext, useContext } from 'react'

import useTableProduct from '@/hooks/products/useTableProducts'

type ProductTableContextProps = ReturnType<typeof useTableProduct>

export const ProductTableContext = createContext<ProductTableContextProps>(
  {} as ProductTableContextProps
)

const useProductTableContext = () => {
  const context = useContext(ProductTableContext)

  if (context === undefined) {
    throw new Error('useProductTable must be used within ProductTableContext')
  }

  return context
}

export { useProductTableContext }
