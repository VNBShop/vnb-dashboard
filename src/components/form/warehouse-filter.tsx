import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'

import Icon from '@/common/icons'
import useSearchProduct from '@/hooks/products/useSearchProduct'
import { WarehouseExportedFilter } from '@/hooks/warehouses/useTableWarehouseExported'

import { cn } from '@/libs/utils'

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
  datetime: Date
}

export default function WarehouseHistoryFilterForm() {
  const form = useForm<Inputs>()

  const { data, isError, isFetching, onSearch, search } = useSearchProduct()

  return (
    <form className="mt-4">
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
                {[].map((item) => (
                  <SelectItem key={item} value={'2'}>
                    Test
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
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
                {[].map((item) => (
                  <SelectItem key={item} value={'2'}>
                    Test
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

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
      </section>

      <div className="mt-4 flex items-center justify-end">
        <Button
          disabled={true}
          type="submit"
          className="flex h-10 items-center gap-1"
        >
          {true && <Spinner size={18} />}
          Search
        </Button>

        <Button
          className="h-10 text-danger hover:underline"
          variant="ghost"
          type="button"
          disabled={true}
          onClick={() => {
            form.reset()
            // onResetFilter()
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}
