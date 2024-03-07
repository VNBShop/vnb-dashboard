import { PropsWithChildren } from 'react'

import { Session, getServerSession } from 'next-auth'

import WarehouseHistoryTab from '@/contents/warehouse-history/tab'
import { authOptions } from '@/libs/authOptions'

export default async function WareHouseHistoryLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <WarehouseHistoryTab user={session?.user as Session['user']} />
      {children}
    </>
  )
}
