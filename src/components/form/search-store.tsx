import { formatISO } from 'date-fns'
import { useForm } from 'react-hook-form'

import { useStoreTableContext } from '@/contexts/stores-table'
import { SearchProductTableProps } from '@/hooks/products/useTableProducts'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchProductTableProps & {
  datetime: {
    from: Date
    to: Date
  }
}

export default function SearchStoreForm() {
  const form = useForm<FormSearchProps>()
  const { onSearch, isLoading: loading, onResetFilter } = useStoreTableContext()

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 space-y-5">
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Input
          {...form.register('search')}
          placeholder="Name store"
          className="h-10"
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
