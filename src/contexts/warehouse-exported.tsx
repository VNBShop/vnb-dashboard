'use client'
import { createContext, useContext } from 'react'

import useTableWarehouseExported from '@/hooks/warehouses/useTableWarehouseExported'

type WarehouseExportedContextProps = ReturnType<
  typeof useTableWarehouseExported
>

export const WareHouseExportedContext =
  createContext<WarehouseExportedContextProps>(
    {} as WarehouseExportedContextProps
  )

const useWareHouseExportedContext = () => {
  const context = useContext(WareHouseExportedContext)

  if (context === undefined) {
    throw new Error(
      'WarehouseExported must be used within a useTableWarehouseExported'
    )
  }

  return context
}

export { useWareHouseExportedContext }
