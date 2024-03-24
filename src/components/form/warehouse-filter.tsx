import dayjs from 'dayjs'
import Image from 'next/image'
import numeral from 'numeral'
import { Controller, useForm } from 'react-hook-form'

import Icon from '@/common/icons'
import { useWareHouseExportedContext } from '@/contexts/warehouse-exported'
import { useWareHouseImportedContext } from '@/contexts/warehouse-imported'
import useGetWarehouseFilter from '@/hooks/common/useGetWarehouseFilter'
import useSearchProduct from '@/hooks/products/useSearchProduct'
import { WarehouseExportedFilter } from '@/hooks/warehouses/useTableWarehouseExported'

import { WarehouseImportedFilter } from '@/hooks/warehouses/useTableWarehouseImported'
import { cn } from '@/libs/utils'

import { StoreSingle } from '@/types/store'
import { Admin } from '@/types/user'

import SearchProductSkeleton from '../skeleton/search-product'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'

type Inputs = WarehouseExportedFilter & {
  datetime: {
    from: Date
    to: Date
  }
}

type IProps = {
  admins: Admin[]
  stores?: StoreSingle[]
  isExported?: boolean
}

export default function WarehouseHistoryFilterForm({
  admins,
  isExported,
  stores,
}: IProps) {
  const form = useForm<Inputs>()

  const { data, isError, isFetching, onSearch, search } = useSearchProduct()
  const {
    onSearch: onFilterImported,
    isLoading: loadingImported,
    onResetFilter: onResetFilterImported,
  } = useWareHouseImportedContext()
  const {
    onSearch: onFilterExported,
    isLoading: loadingExported,
    onResetFilter: onResetFilterExported,
  } = useWareHouseExportedContext()

  const onSubmit = (values: Inputs) => {
    const payload = {
      actorId: values?.actorId
        ? (numeral(values?.actorId)?.value() as number)
        : undefined,
      productId: values?.productId
        ? (numeral(values?.productId)?.value() as number)
        : undefined,
      startDate: values?.datetime?.from
        ? dayjs(values?.datetime?.from).toISOString()
        : undefined,
      endDate: values?.datetime?.to
        ? dayjs(values?.datetime?.to).toISOString()
        : undefined,
    }

    if (!!isExported) {
      const params: WarehouseExportedFilter = {
        ...payload,
        importTo: numeral(values?.importTo)?.value() as number,
      }
      onFilterExported(params)
    } else {
      onFilterImported(payload)
    }
  }

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Controller
          control={form.control}
          name="productId"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  style={{
                    height: 40,
                  }}
                  className={cn(
                    'justify-between text-gray-400 shadow-none  hover:bg-transparent hover:text-gray-400',
                    field.value && 'text-black'
                  )}
                >
                  {field.value
                    ? data?.find((data) => data.productId === field.value)
                        ?.productName ?? 'Select product'
                    : 'Select product'}
                  <div className="ml-2 h-4 w-4 shrink-0 opacity-50">
                    <Icon name="CaretSort" size={16} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command key={'search-product'} shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={(e) => {
                      if (!e) {
                        form.resetField('productId')
                      }
                      onSearch(e)
                    }}
                    placeholder="Search product..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandGroup>
                      {!isFetching && !isError
                        ? data?.map((product) => (
                            <CommandItem
                              value={product?.productId?.toString()}
                              key={product?.productId?.toString()}
                              onSelect={(value) => {
                                form.setValue('productId', Number(value))
                              }}
                            >
                              <section className="flex items-center gap-3">
                                <figure className="relative h-10 w-10 overflow-hidden rounded-full">
                                  <Image
                                    src={
                                      product?.productImages[0]
                                        .productAssetUrl ?? ''
                                    }
                                    alt="product id"
                                    sizes="100vw"
                                    className=" rounded-full object-cover"
                                    fill
                                  />
                                </figure>
                                <article>
                                  <p className="text-sm font-medium">
                                    {product?.productName}
                                  </p>
                                  <p className="text-xs text-secondary">
                                    {product?.productPrice?.toLocaleString()}
                                  </p>
                                </article>
                              </section>
                              <div
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  product?.productId === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              >
                                <Icon name="Checked" size={16} />
                              </div>
                            </CommandItem>
                          ))
                        : null}

                      {isFetching && !data && !isError ? (
                        <SearchProductSkeleton />
                      ) : null}
                    </CommandGroup>
                    {(isError || !data) && !isFetching ? (
                      <p className="grid place-items-center py-4 text-sm">
                        No product found
                      </p>
                    ) : null}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        <Controller
          control={form.control}
          name="actorId"
          render={({ field }) => (
            <Select
              key={field.value}
              onValueChange={field.onChange}
              value={field?.value?.toString()}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Actor" />
              </SelectTrigger>
              <SelectContent>
                {admins?.map((item) => (
                  <SelectItem
                    key={item?.adminId}
                    value={item?.adminId?.toString()}
                  >
                    {item?.adminName}
                  </SelectItem>
                )) ?? (
                  <p className="grid place-items-center py-4 text-sm">
                    No admins found
                  </p>
                )}
              </SelectContent>
            </Select>
          )}
        />
        {!!isExported && (
          <Controller
            control={form.control}
            name="importTo"
            render={({ field }) => (
              <Select
                key={field.value}
                onValueChange={field.onChange}
                value={field?.value?.toString()}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Import to" />
                </SelectTrigger>
                <SelectContent>
                  {stores?.map((item) => (
                    <SelectItem
                      key={item?.storeId}
                      value={item?.storeId?.toString()}
                    >
                      {item?.storeName}
                    </SelectItem>
                  )) ?? (
                    <p className="grid place-items-center py-4 text-sm">
                      No stores found
                    </p>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        )}

        <Controller
          name="datetime"
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Calendar
                buttonHeight={40}
                mode="range"
                date={value}
                onChange={onChange}
              />
            )
          }}
        />

        {!isExported && (
          <div className="flex items-center justify-end">
            <Button
              disabled={loadingImported}
              type="submit"
              className="flex h-10 items-center gap-1"
            >
              {loadingImported && <Spinner size={18} />}
              Search
            </Button>

            <Button
              className="h-10 text-danger hover:underline"
              variant="ghost"
              type="button"
              disabled={loadingImported}
              onClick={() => {
                form.reset()
                onResetFilterImported()
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </section>

      {!!isExported && (
        <div className="mt-5 flex items-center justify-end">
          <Button
            disabled={loadingExported}
            type="submit"
            className="flex h-10 items-center gap-1"
          >
            {loadingExported && <Spinner size={18} />}
            Search
          </Button>

          <Button
            className="h-10 text-danger hover:underline"
            variant="ghost"
            type="button"
            disabled={loadingExported}
            onClick={() => {
              form.reset()
              onResetFilterExported()
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </form>
  )
}
