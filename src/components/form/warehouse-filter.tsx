import { Controller, useForm } from 'react-hook-form'

import Icon from '@/common/icons'
import useSearchProduct from '@/hooks/products/useSearchProduct'
import { WarehouseExportedFilter } from '@/hooks/warehouses/useTableWarehouseExported'

import { cn } from '@/libs/utils'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Command,
  CommandEmpty,
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

  const { data, isError, isFetching, isLoading, isPending, onSearch, search } =
    useSearchProduct()

  console.log('form >>', form.getValues('actorId'))

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
                  className={cn(
                    'justify-between',
                    !field.value &&
                      'h-10 text-gray-400 shadow-none hover:bg-transparent hover:text-gray-400'
                  )}
                >
                  {field.value
                    ? data?.find((data) => data.productId === field.value)
                        ?.productName
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
                    onValueChange={onSearch}
                    placeholder="Search product..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>hehe</CommandEmpty>
                    <CommandGroup>
                      {data?.map((product) => (
                        <CommandItem
                          value={product?.productId?.toString()}
                          key={product?.productId?.toString()}
                          onSelect={(value) => {
                            form.setValue('productId', Number(value))
                          }}
                        >
                          {product?.productName}
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
                      ))}
                    </CommandGroup>
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

      <div className="flex items-center justify-end">
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
