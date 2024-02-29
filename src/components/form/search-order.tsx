import { formatISO } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'

import { useOrdersTableContext } from '@/contexts/orders-table '
import { SearchOrdersTableProps } from '@/hooks/order/useOrdersTable'

import { StoreSingle } from '@/types/store'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchOrdersTableProps & {
  datetime: {
    from: Date
    to: Date
  }
}

type IProps = {
  stores: StoreSingle[]
}

export default function SearchOrdersForm({ stores }: IProps) {
  const form = useForm<FormSearchProps>()
  const {
    onSearch,
    isLoading: loading,
    onResetFilter,
  } = useOrdersTableContext()

  const onSubmit = (values: FormSearchProps) => {
    const { datetime, ...payload } = {
      ...values,
      startDate: values?.datetime?.from
        ? formatISO(values.datetime.from)
        : undefined,
      endDate: values?.datetime?.to ? formatISO(values.datetime.to) : undefined,
    }

    onSearch(payload)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="my-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
    >
      <Controller
        control={form.control}
        name="storeId"
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

      <div className="flex justify-end md:col-span-2">
        <Button
          disabled={loading}
          type="submit"
          className="flex h-10 items-center gap-1"
        >
          {loading && <Spinner size={18} />}
          Search
        </Button>

        <Button
          className="h-10 text-danger hover:underline"
          variant="ghost"
          type="button"
          disabled={loading}
          onClick={() => {
            form.reset()
            onResetFilter()
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}
