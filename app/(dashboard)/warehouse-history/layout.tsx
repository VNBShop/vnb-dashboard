import { PropsWithChildren } from 'react'

import WarehouseHistoryTab from '@/contents/warehouse-history/tab'

export default function WareHouseHistoryLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <WarehouseHistoryTab />
      {children}
    </>
  )
}
