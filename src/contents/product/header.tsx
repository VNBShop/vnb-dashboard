'use client'

import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form'

import Icon from '@/common/icons'
import HeaderSection from '@/components/header-section'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

export default function ProductsHeader() {
  const form = useForm()

  const onSubmit = (value: any) => {
    console.log('value >>', value)
  }

  return (
    <>
      <HeaderSection title="Products">
        <section className="flex items-center gap-4">
          <Button className="h-[38px]" variant="outline">
            <Icon name="Filter" width={16} height={16} />
          </Button>
          <Link
            href="/product/create"
            className=" inline-flex items-center gap-1 rounded-md border border-success bg-white p-2 text-sm font-medium text-success lg:hover:bg-success lg:hover:text-white"
          >
            <Icon name="Plus" width={20} height={20} />
            Create product
          </Link>
        </section>
      </HeaderSection>

      <form
        className="my-5 grid grid-cols-4 gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input placeholder="Search product..." />
        <Controller
          name="date"
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return <Calendar mode="range" date={value} onChange={onChange} />
          }}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  )
}
