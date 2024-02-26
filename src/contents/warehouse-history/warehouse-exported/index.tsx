'use client'
import Image from 'next/image'
import DataTable from 'react-data-table-component'

import { WareHouseExportedContext } from '@/contexts/warehouse-exported'
import useHydration from '@/hooks/useHydration'

import useTableWarehouseExported from '@/hooks/warehouses/useTableWarehouseExported'

import genColumns from './columns'

import WareHouseExportedHeader from './header'

import { EmptyImg } from '../../../../public'
import ProductTableSkeleton from '../../products/skeleton'

export default function WareHouseExportedContent() {
  const { hydration } = useHydration()
  const values = useTableWarehouseExported()
  const columns = genColumns()
  if (hydration) {
    return <p className="mt-4">Wait a minute...</p>
  }
  return (
    <WareHouseExportedContext.Provider value={values}>
      <WareHouseExportedHeader />
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
    </WareHouseExportedContext.Provider>
  )
}
