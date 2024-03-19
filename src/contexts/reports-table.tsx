'use client'
import { createContext, useContext } from 'react'

import useReportsTable from '@/hooks/reports/useReportsTable'

type ReportsTableContextProps = ReturnType<typeof useReportsTable>

export const ReportsTableContext = createContext<ReportsTableContextProps>(
  {} as ReportsTableContextProps
)

const useReportsTableContext = () => {
  const context = useContext(ReportsTableContext)

  if (context === undefined) {
    throw new Error('useReportsTable must be used within ReportsTableContext')
  }

  return context
}

export { useReportsTableContext }
