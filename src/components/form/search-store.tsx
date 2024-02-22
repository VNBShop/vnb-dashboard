import { formatISO } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'

import { SearchProductTableProps } from '@/hooks/useTableDataProduct'

import { brands, categories } from '@/libs/constants'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchProductTableProps & {
  datetime: {
    from: Date
    to: Date
  }
}

type SearchStoreFormProps = {
  onSearch: (values: SearchProductTableProps) => void
  loading: boolean
}

export default function SearchStoreForm({
  onSearch,
  loading,
}: SearchStoreFormProps) {
  const form = useForm<FormSearchProps>()

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
          onClick={() => form.reset()}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}
