import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'

import { useReportsTableContext } from '@/contexts/reports-table'
import { useVouchersTableContext } from '@/contexts/vouchers-table'
import { SearchVouchersTableProps } from '@/hooks/vouchers/useVouchersTable'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchVouchersTableProps & {
  datetime: {
    from: Date
    to: Date
  }
}

export default function SearchVouchersForm() {
  const form = useForm<FormSearchProps>()
  const {
    onSearch,
    isLoading: loading,
    onResetFilter,
  } = useVouchersTableContext()

  const onSubmit = (values: FormSearchProps) => {
    onSearch({
      voucherCode: values?.voucherCode,
      startDate: !!values?.datetime?.from
        ? dayjs(values?.datetime?.from).toISOString()
        : undefined,
      endDate: !!values?.datetime?.from
        ? dayjs(values?.datetime?.from).toISOString()
        : undefined,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 space-y-5">
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Controller
          control={form.control}
          name="voucherCode"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Voucher code"
              className="h-10"
              value={value}
              onChange={onChange}
            />
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
                className="text-gray-800"
              />
            )
          }}
        />
      </section>

      <div className="flex items-center justify-end">
        <Button
          disabled={loading}
          type="submit"
          className="flex h-10 items-center gap-1"
          size="sm"
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
