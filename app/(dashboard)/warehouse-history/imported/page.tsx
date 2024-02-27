import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Session, getServerSession } from 'next-auth'

import useAxiosPrivate from '@/api/private/useAxios'
import WareHouseImportedContent from '@/contents/warehouse-history/warehouse-imported'
import { authOptions } from '@/libs/authOptions'
import { USER_SERVICE } from '@/libs/micro-service'

export default async function WarehouseImported() {
  const session = await getServerSession(authOptions)

  return <WareHouseImportedContent user={session?.user as Session['user']} />
}
