import { useState } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import Icon from '@/common/icons'
import SizeUpdateForm, {
  SizeUpdateFormProps,
} from '@/components/form/size-update'
import { Modal } from '@/components/ui/modal'
import { ProductsWarehouseResponse } from '@/hooks/useTableDataProductsWarehouse'
import { ProductWarehouse } from '@/types/product'

type ProductsWarehouseQuantityColumnProps = {
  row: ProductWarehouse
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductsWarehouseResponse, Error>>
}

export default function ProductsWarehouseQuantityColumn({
  row,
  refetch,
}: ProductsWarehouseQuantityColumnProps) {
  const [update, setUpdate] = useState<{
    open: boolean
    data: SizeUpdateFormProps
    isExport?: boolean
  }>({
    open: false,
    data: {} as SizeUpdateFormProps,
    isExport: false,
  })

  const onCloseModal = () => {
    setUpdate({
      open: false,
      data: {} as SizeUpdateFormProps,
      isExport: false,
    })
  }

  return (
    <>
      <div className="grid gap-y-2">
        {row.productSizeAndStockResponses.map((size, index) => (
          <div
            key={size.productStockSizeId}
            className="flex items-center gap-1"
          >
            <span className="text-secondary">
              {size?.productStockSize ? `${size?.productStockSize}: ` : null}
            </span>{' '}
            {size?.productStockQuantity ?? 0}
            <section className="flex items-center gap-[6px]">
              <div
                className="ml-3 text-blue-500 hover:cursor-pointer"
                onClick={() =>
                  setUpdate({
                    open: true,
                    data: {
                      isHaveSize: row?.productIsHaveSize,
                      payload: size,
                    },
                  })
                }
              >
                <Icon name="Pen" size={16} />
              </div>
              <div className="h-[14px] w-[1px] bg-gray-300" />
              <div
                className="text-success hover:cursor-pointer"
                onClick={() =>
                  setUpdate({
                    open: true,
                    isExport: true,
                    data: {
                      isHaveSize: row?.productIsHaveSize,
                      payload: size,
                    },
                  })
                }
              >
                <Icon name="ProductExport" size={16} />
              </div>
            </section>
          </div>
        ))}
      </div>

      <Modal
        header={`${update?.isExport ? 'Export' : 'Import'} product`}
        show={update.open}
        onCloseModal={onCloseModal}
      >
        <section className="mt-4">
          <section className="mb-4 space-y-2">
            <div className="text-gray-400">
              ID: <span className="text-secondary">{row?.productId}</span>
            </div>
            <div className="text-gray-400">
              Product name:{' '}
              <span className="font-medium text-black">{row?.productName}</span>
            </div>
            {!!row?.productIsHaveSize &&
            !!update?.data?.payload?.productStockSize ? (
              <div>
                <span className="text-gray-400">Size name:</span>{' '}
                <span className="font-medium">
                  {update.data.payload.productStockSize}
                </span>
              </div>
            ) : null}

            <div>
              <span className="text-gray-400">Current quantity:</span>{' '}
              <span className="font-medium">
                {update?.data?.payload?.productStockQuantity ?? 0}
              </span>
            </div>
          </section>
          <SizeUpdateForm
            isExport={update?.isExport}
            data={update.data}
            refetch={refetch}
            onClose={onCloseModal}
          />
        </section>
      </Modal>
    </>
  )
}
