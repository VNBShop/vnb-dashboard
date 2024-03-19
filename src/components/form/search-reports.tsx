import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'

import { useReportsTableContext } from '@/contexts/reports-table'
import { SearchReportsTableProps } from '@/hooks/reports/useReportsTable'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchReportsTableProps & {
  datetime: {
    from: Date
    to: Date
  }
}

export default function SearchReportsForm() {
  const form = useForm<FormSearchProps>()
  const {
    onSearch,
    isLoading: loading,
    onResetFilter,
  } = useReportsTableContext()

  const onSubmit = (values: FormSearchProps) => {
    onSearch({
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
