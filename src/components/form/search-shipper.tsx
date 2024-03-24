import { formatISO } from 'date-fns'
import { useForm } from 'react-hook-form'

import { useShipperTableContext } from '@/contexts/shipper-table'
import { useStoreTableContext } from '@/contexts/stores-table'

import { SearchShipperTableProps } from '@/hooks/shipper/useShipperTable'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

type FormSearchProps = SearchShipperTableProps

export default function SearchShippersForm() {
  const form = useForm<FormSearchProps>()
  const {
    onSearch,
    isLoading: loading,
    onResetFilter,
  } = useShipperTableContext()

  const onSubmit = (values: FormSearchProps) => {
    onSearch({
      search: values?.search,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 space-y-5">
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Input
          {...form.register('search')}
          placeholder="Shipper name"
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
