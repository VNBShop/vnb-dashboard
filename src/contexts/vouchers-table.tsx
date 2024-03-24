'use client'
import { createContext, useContext } from 'react'

import useVouchersTable from '@/hooks/vouchers/useVouchersTable'

type VouchersTableContextProps = ReturnType<typeof useVouchersTable>

export const VouchersTableContext = createContext<VouchersTableContextProps>(
  {} as VouchersTableContextProps
)

const useVouchersTableContext = () => {
  const context = useContext(VouchersTableContext)

  if (context === undefined) {
    throw new Error('useVouchersTable must be used within VouchersTableContext')
  }

  return context
}

export { useVouchersTableContext }
