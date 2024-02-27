'use client'
import Image from 'next/image'
import { Session } from 'next-auth'
import DataTable from 'react-data-table-component'

import { WareHouseImportedContext } from '@/contexts/warehouse-imported'
import useGetWarehouseFilter from '@/hooks/common/useGetWarehouseFilter'
import useHydration from '@/hooks/useHydration'
import useTableWarehouseImported from '@/hooks/warehouses/useTableWarehouseImported'

import genColumns from './columns'

import WareHouseImportedHeader from './header'

import { EmptyImg } from '../../../../public'
import ProductTableSkeleton from '../../products/skeleton'

type IProps = {
  user: Session['user']
}

export default function WareHouseImportedContent({ user }: IProps) {
  const { hydration } = useHydration()
  const values = useTableWarehouseImported({ user })
  const columns = genColumns()

  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }
  return (
    <WareHouseImportedContext.Provider value={values}>
      <WareHouseImportedHeader />
      {values.isFetching || values.isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <section className="mt-4">
          <DataTable
            columns={columns as []}
            data={values?.data?.data ?? []}
            pagination
            paginationServer
            paginationTotalRows={values?.data?.total ?? 0}
            paginationDefaultPage={values?.currentPage}
            onChangePage={values.onPageChange}
            onChangeRowsPerPage={values.onPerPageChange}
            noDataComponent={
              <div className="mt-[120px] grid place-items-center gap-5">
                <Image
                  src={EmptyImg}
                  width={100}
                  height={100}
                  sizes="100vw"
                  alt="Empty"
                />
                <p className="font-medium text-gray-500">No data 😢</p>
              </div>
            }
          />
        </section>
      )}
    </WareHouseImportedContext.Provider>
  )
}
