'use client'
import { createContext, useContext } from 'react'

import useTableWarehouseImported from '@/hooks/warehouses/useTableWarehouseImported'

type WarehouseImportedContextProps = ReturnType<
  typeof useTableWarehouseImported
>

export const WareHouseImportedContext =
  createContext<WarehouseImportedContextProps>(
    {} as WarehouseImportedContextProps
  )

const useWareHouseImportedContext = () => {
  const context = useContext(WareHouseImportedContext)

  if (context === undefined) {
    throw new Error(
      'WarehouseImported must be used within a useTableWarehouseImported'
    )
  }

  return context
}

export { useWareHouseImportedContext }
