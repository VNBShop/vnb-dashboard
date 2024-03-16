'use client'
import { createContext, useContext } from 'react'

import useUsersTable from '@/hooks/users/useUsersTable'

type UsersTableContextProps = ReturnType<typeof useUsersTable>

export const UsersTableContext = createContext<UsersTableContextProps>(
  {} as UsersTableContextProps
)

const useUsersTableContext = () => {
  const context = useContext(UsersTableContext)

  if (context === undefined) {
    throw new Error('useUsersTable must be used within UsersTableContext')
  }

  return context
}

export { useUsersTableContext }
