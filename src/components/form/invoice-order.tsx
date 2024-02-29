'use client'

import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Icon from '@/common/icons'

import InvoiceCart from '@/contents/invoice/invoice-cart'

import InvoiceStateModal from '@/contents/invoice/state-modal'
import useCreateInvoice, {
  CreateInvoicePayload,
} from '@/hooks/order/useCreateInvoice'
import { InvoiceShema } from '@/libs/validations/invoice'
import { Product } from '@/types/product'

import { CartEmpty } from '../../../public'
import SearchInvoice from '../../contents/invoice/invoice-search'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

import { Input } from '../ui/input'
import Spinner from '../ui/spinner'

export type CartInvoice = Pick<
  Product,
  'productPrice' | 'productImages' | 'productName'
> & {
  quantity: number
  nameSize?: string
  id: number
}

type Inpust = z.infer<typeof InvoiceShema>

export default function InvoiceOrderForm() {
  const form = useForm<Inpust>({
    resolver: zodResolver(InvoiceShema),
    defaultValues: {
      firstName: '',
      phone: '',
    },
  })
  const [products, setProducts] = useState<CartInvoice[]>([])
  const [stateModal, setStateModal] = useState(false)

  const onAddProducts = (
    prod: Product & {
      nameSize?: string
      id: number
    }
  ) => {
    setProducts((prev) => {
      const findProduct = prev.findIndex((item) => item?.id === prod?.id)

      if (findProduct !== -1) {
        const newProducts = [...prev]

        newProducts[findProduct] = {
          ...prev[findProduct],
          quantity: prev[findProduct].quantity + 1,
        }

        return newProducts
      }
      return [
        ...prev,
        {
          productId: prod?.productId,
          productImages: prod?.productImages,
          productName: prod?.productName,
          productPrice: prod?.productPrice,
          quantity: 1,
          nameSize: prod?.nameSize,
          id: prod.id,
        },
      ]
    })
  }

  const onOpenModal = () => {
    setStateModal(true)
  }

  const { loading, onCreate } = useCreateInvoice({ onOpenModal })

  const onSubmit = (values: Inpust) => {
    console.log('values', values)
    if (!products?.length) return
    const orderProds: CreateInvoicePayload['products'] = products.map(
      (prod) => ({
        productSizeId: prod.id,
        quantity: prod.quantity,
      })
    )

    const payload: CreateInvoicePayload = {
      firstName: values.firstName,
      phone: values.phone,
      products: orderProds,
    }

    onCreate(payload)
  }

  const onCloseModal = () => {
    setProducts([])
    form.reset()
    setStateModal(false)
  }

  useEffect(() => {
    return () => {
      setProducts([])
      form.reset()
      setStateModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section className="mt-5 overflow-auto pb-2">
        <div className="mb-7">
          <SearchInvoice onAddProducts={onAddProducts} />
        </div>
        {!!products?.length ? (
          <section className="flex flex-col items-start gap-7 md:flex-row">
            <InvoiceCart products={products} setProducts={setProducts} />

            <section className="sticky top-0 w-full rounded-md bg-white p-4 pr-2 shadow-sm md:w-[40%]">
              <p className="mb-4 flex items-center gap-1 font-medium">
                <Icon name="Selling" size={16} />
                Bill info:
              </p>

              <Form {...form}>
                <form
                  className=" space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Customer name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Customer phone number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <section className="space-y-1">
                    {products.map((prod) => (
                      <section
                        key={prod.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          {prod.productName}
                          {prod?.nameSize ? (
                            <span>({prod.nameSize})</span>
                          ) : null}
                          {` `}
                          <span className=" text-gray-500">
                            x{prod.quantity}
                          </span>
                        </div>
                        <p>
                          {(prod.productPrice * prod.quantity).toLocaleString()}
                        </p>
                      </section>
                    ))}
                  </section>

                  <div className="h-[1px] w-full bg-slate-300" />

                  <section className="flex items-center justify-between text-[15px]">
                    <p className="font-medium">Totally</p>

                    <span className="font-medium text-secondary">
                      {products
                        .reduce(
                          (acc, curr) =>
                            acc + curr.quantity * curr.productPrice,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </section>

                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full space-x-1"
                  >
                    {loading && <Spinner size={18} />}
                    <span> Payment</span>
                  </Button>
                </form>
              </Form>
            </section>
          </section>
        ) : (
          <section className="mt-[100px] flex items-center justify-center">
            <Image
              alt="Empty cart"
              src={CartEmpty}
              width={200}
              height={200}
              sizes="100vw"
            />
          </section>
        )}
      </section>

      <InvoiceStateModal open={stateModal} onCloseModal={onCloseModal} />
    </>
  )
}
