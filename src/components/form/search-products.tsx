import { formatISO } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'

import { useProductTableContext } from '@/contexts/product-table'
import { SearchProductTableProps } from '@/hooks/products/useProductsTable'

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

export default function SearchProductForm() {
  const form = useForm<FormSearchProps>()

  const {
    onSearch,
    onResetFilter,
    isLoading: loading,
  } = useProductTableContext()

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
          placeholder="Name, category, brand..."
          className="h-10"
        />

        <Controller
          name="category"
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Select key={value} value={value} onValueChange={onChange}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectGroup key={item.categoryName}>
                      <SelectLabel>{item.categoryName}</SelectLabel>
                      {item.subCategories.map((i) => (
                        <SelectItem
                          key={i.subCategoryId}
                          value={i.subCategoryId.toString()}
                        >
                          {i.subCategoryName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )
          }}
        />

        <Controller
          name="brandIds"
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Select key={value} value={value} onValueChange={onChange}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((i) => (
                    <SelectItem key={i.brandId} value={i.brandId.toString()}>
                      {i.brandName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          }}
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
          disabled={loading}
          type="submit"
          size="sm"
          className="flex h-10 items-center gap-1"
        >
          {loading && <Spinner size={18} />}
          Search
        </Button>

        <Button
          className="h-10 text-danger hover:underline"
          variant="ghost"
          type="button"
          size="sm"
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
