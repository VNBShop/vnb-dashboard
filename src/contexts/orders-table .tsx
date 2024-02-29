'use client'
import { createContext, useContext } from 'react'

import useOrdersTable from '@/hooks/order/useOrdersTable'

type OrdersTableContextProps = ReturnType<typeof useOrdersTable>

export const OrdersTableContext = createContext<OrdersTableContextProps>(
  {} as OrdersTableContextProps
)

const useOrdersTableContext = () => {
  const context = useContext(OrdersTableContext)

  if (context === undefined) {
    throw new Error('useOrdersTable must be used within OrdersTableContext')
  }

  return context
}

export { useOrdersTableContext }
