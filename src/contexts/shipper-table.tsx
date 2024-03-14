'use client'
import { createContext, useContext } from 'react'

import useShipperTable from '@/hooks/shipper/useShipperTable'

type ShipperTableContextProps = ReturnType<typeof useShipperTable>

export const ShipperTableContext = createContext<ShipperTableContextProps>(
  {} as ShipperTableContextProps
)

const useShipperTableContext = () => {
  const context = useContext(ShipperTableContext)

  if (context === undefined) {
    throw new Error('useShipperTable must be used within ShipperTableContext')
  }

  return context
}

export { useShipperTableContext }
