'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signInSchema } from '@/libs/validations/auth'

import GoogleOAuth from './google-signin'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import InputPassword from '../ui/input-password'

import Spinner from '../ui/spinner'

type Inputs = z.infer<typeof signInSchema>

export default function SigninForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: Inputs) => {
    console.log('values: ', values)
    setLoading(true)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    setLoading(false)

    if (result?.ok) {
      toast.success('Login successfully!')
      router.refresh()
    } else {
      toast.error(result?.error)
    }
  }

  return (
    <section className="w-full px-4 md:w-[500px] md:rounded-md md:bg-white md:p-4 md:py-7 md:shadow">
      <GoogleOAuth />

      <div className="my-7 flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-gray-100" />
        <p className="text-sm text-gray-500">or</p>
        <div className="h-[1px] flex-1 bg-gray-100" />
      </div>

      <Form {...form}>
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <InputPassword placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button
            type="submit"
            className="flex w-full items-center gap-1"
            disabled={loading}
          >
            {loading && <Spinner size={16} />}
            Sign in
          </Button>
        </form>
      </Form>
    </section>
  )
}
