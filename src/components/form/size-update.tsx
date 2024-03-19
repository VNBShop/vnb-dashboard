import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import numeral from 'numeral'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import useTableDataStores from '@/hooks/stores/useStoresTable'
import { ProductsWarehouseResponse } from '@/hooks/warehouses/useProductsWarehouseTable'
import useUpdateSize, {
  UpdateSizePayload,
} from '@/hooks/warehouses/useUpdateSize'

import { SizeExportSchema, SizeImportSchema } from '@/libs/validations/product'

import { ProductWarehouse, ProductWarehouseSizeStock } from '@/types/warehouse'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import InputNumber from '../ui/input-number'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'

type InputsImport = z.infer<typeof SizeImportSchema>
type InputsExport = z.infer<typeof SizeExportSchema>

type Inputs = InputsImport | InputsExport

export type SizeUpdateFormProps = {
  isHaveSize: ProductWarehouse['productIsHaveSize']
  payload: ProductWarehouseSizeStock
}

type IProps = {
  isExport?: boolean
  data: SizeUpdateFormProps
  onClose: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductsWarehouseResponse, Error>>
}

export default function SizeUpdateForm({
  data,
  onClose,
  refetch,
  isExport,
}: IProps) {
  const form = useForm<Inputs>({
    defaultValues: { stock: '' },
    resolver: zodResolver(isExport ? SizeExportSchema : SizeImportSchema),
  })

  const { data: storesRes, isFetching } = useTableDataStores({ isExport })

  const stores =
    storesRes?.data?.map((store) => ({
      storeId: store?.storeId,
      storeName: store?.storeName,
    })) ?? []

  const { loading, onUpdate } = useUpdateSize({ onClose, refetch, isExport })

  const onSubmit = (values: Inputs) => {
    if (!data?.payload?.productStockSizeId) return

    const payloadImport: UpdateSizePayload = {
      productSizeId: data.payload?.productStockSizeId,
      stock: numeral(values.stock).value() ?? 0,
      priceUnit: numeral((values as InputsImport)?.priceUnit).value() ?? 0,
    }

    const payloadExport: UpdateSizePayload = {
      productSizeId: data.payload?.productStockSizeId,
      stock: numeral(values.stock).value() ?? 0,
      storeId: numeral((values as InputsExport).storeId).value() as number,
    }

    onUpdate(isExport ? payloadExport : payloadImport)
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputNumber
                  className="h-10"
                  thousandSeparator
                  placeholder="Enter amount quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isExport && (
          <FormField
            control={form.control}
            name="priceUnit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputNumber
                    className="h-10"
                    thousandSeparator
                    placeholder="Enter price unit"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isExport ? (
          isFetching ? (
            <p>Loading stores...</p>
          ) : (
            <FormField
              control={form.control}
              name="storeId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      key={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Choose store" />
                      </SelectTrigger>
                      <SelectContent>
                        {stores.map((store) => (
                          <SelectItem
                            key={store.storeId}
                            value={store.storeId.toString()}
                          >
                            {store.storeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        ) : null}

        <section className="mt-7 flex items-center justify-center">
          <Button disabled={loading} className="flex h-10 items-center gap-1">
            {loading && <Spinner size={16} />}
            {isExport ? 'Export' : 'Import'}
          </Button>
        </section>
      </form>
    </Form>
  )
}
