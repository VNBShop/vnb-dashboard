'use client'
import { createContext, useContext } from 'react'

import useProductsWarehouseTable from '@/hooks/warehouses/useProductsWarehouseTable'

type ProductWarehouseTableContextProps = ReturnType<
  typeof useProductsWarehouseTable
>

export const ProductWarehouseTableContext =
  createContext<ProductWarehouseTableContextProps>(
    {} as ProductWarehouseTableContextProps
  )

const useProductWarehouseTableContext = () => {
  const context = useContext(ProductWarehouseTableContext)

  if (context === undefined) {
    throw new Error(
      'useProductWarehouseTable must be used within ProductWarehouseTableContext'
    )
  }

  return context
}

export { useProductWarehouseTableContext }
