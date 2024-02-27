'use client'
import { createContext, useContext } from 'react'

import useStoresTable from '@/hooks/stores/useStoresTable'

type StoreTableContextProps = ReturnType<typeof useStoresTable>

export const StoreTableContext = createContext<StoreTableContextProps>(
  {} as StoreTableContextProps
)

const useStoreTableContext = () => {
  const context = useContext(StoreTableContext)

  if (context === undefined) {
    throw new Error(
      'useStoreTableContext must be used within StoreTableContext'
    )
  }

  return context
}

export { useStoreTableContext }
