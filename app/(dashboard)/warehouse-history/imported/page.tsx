import { Session, getServerSession } from 'next-auth'

import WareHouseImportedContent from '@/contents/warehouse-history/warehouse-imported'
import { authOptions } from '@/libs/authOptions'

export default async function WarehouseImported() {
  const session = await getServerSession(authOptions)
  return <WareHouseImportedContent user={session?.user as Session['user']} />
}
