import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import useCreateStore from '@/hooks/useCreateStore'
import { ProductResponse } from '@/hooks/useTableDataProduct'
import { storeSchema } from '@/libs/validations/store'
import { Store } from '@/types/store'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

type StoreFormProps = {
  onCloseModal: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
  updateData?: Store
}

// type FormProps = {
//   storeName: string
//   storeAddress: string
//   storePhone: string
//   storeEmail: string
//   storeOwnerEmail: string
// }

type FormProps = z.infer<typeof storeSchema>

export default function StoreForm({
  onCloseModal,
  refetch,
  updateData,
}: StoreFormProps) {
  const form = useForm<FormProps>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: '',
      storeAddress: '',
      storeEmail: '',
      storeOwnerEmail: '',
      storePhone: '',
    },
  })

  const { onCreateProduct, loading } = useCreateStore({ onCloseModal, refetch })

  const onSubmit = (values: FormProps) => {
    onCreateProduct(values)
  }

  console.log('form error', form.formState.errors)

  return (
    <Form {...form}>
      <form
        className="mt-5 grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <section className="grid grid-cols-2 gap-7 gap-y-4">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={'storePhone'}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={'storeEmail'}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={'storeOwnerEmail'}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email owner address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </section>

        <FormField
          control={form.control}
          name={'storeAddress'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="mt-7 flex items-center justify-center">
          <Button
            disabled={loading}
            type="submit"
            className="flex items-center gap-1"
          >
            {loading && <Spinner size={16} />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
