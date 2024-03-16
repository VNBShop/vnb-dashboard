import { Controller, useForm } from 'react-hook-form'

import { useUsersTableContext } from '@/contexts/users-table'
import { SearchUsersTableProps } from '@/hooks/users/useUsersTable'

import { userRoleOptions } from '@/libs/constants'

import { Button } from '../ui/button'
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

type FormSearchProps = SearchUsersTableProps

export default function SearchUsersForm() {
  const form = useForm<FormSearchProps>()
  const { onSearch, isLoading: loading, onResetFilter } = useUsersTableContext()

  const onSubmit = (values: FormSearchProps) => {
    onSearch(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 space-y-5">
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Input
          {...form.register('search')}
          placeholder="Name store"
          className="h-10"
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field }) => {
            return (
              <Select
                key={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoleOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
