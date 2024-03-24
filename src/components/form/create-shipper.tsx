import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import useAddShipper from '@/hooks/shipper/useAddShipper'
import { shipperShema } from '@/libs/validations/shipper'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

type StoreFormProps = {
  onCloseModal: () => void
}

type FormProps = z.infer<typeof shipperShema>

export default function CreateShipperForm({ onCloseModal }: StoreFormProps) {
  const form = useForm<FormProps>({
    resolver: zodResolver(shipperShema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      idNumber: '',
    },
  })

  const { loading, onAddShipper } = useAddShipper({
    onSuccess: onCloseModal,
  })

  const onSubmit = (values: FormProps) => {
    onAddShipper(values)
  }

  return (
    <Form {...form}>
      <form
        className="mt-5 grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <section className="grid grid-cols-2 gap-7 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="First name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={'lastName'}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name={'phone'}
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
            name={'email'}
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
            name={'idNumber'}
            render={({ field }) => {
              return (
                <FormItem className=" col-span-2">
                  <FormControl>
                    <Input {...field} placeholder="Identify number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </section>

        <div className="mt-7 flex items-center justify-center">
          <Button
            disabled={loading}
            type="submit"
            className="flex w-[100px] items-center gap-1"
          >
            {loading && <Spinner size={16} />}
            Add
          </Button>
        </div>
      </form>
    </Form>
  )
}
