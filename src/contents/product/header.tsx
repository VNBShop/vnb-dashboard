import { useState } from 'react'

import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form'

import Icon from '@/common/icons'
import HeaderSection from '@/components/header-section'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

export default function ProductsHeader() {
  const form = useForm()

  const [filter, setFilter] = useState(false)

  const onSubmit = (value: any) => {
    console.log('value >>', value)
  }

  return (
    <>
      <HeaderSection title="Products">
        <section className="flex items-center gap-4">
          <div
            className="flex h-[36px] items-center justify-center rounded border px-4 hover:cursor-pointer hover:bg-black hover:text-white"
            onClick={() => setFilter((prev) => !prev)}
          >
            <Icon name="Filter" size={16} />
          </div>
          <Link
            href="/product/create"
            className=" inline-flex items-center gap-1 rounded border bg-success p-2 px-4 text-sm font-medium text-white lg:hover:bg-success lg:hover:text-white"
          >
            <Icon name="Plus" size={20} />
            Create
          </Link>
        </section>
      </HeaderSection>

      {filter && (
        <form
          className="my-5 grid grid-cols-4 gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input placeholder="Search product..." className="h-10" />
          <Controller
            name="date"
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
          <div>
            <Button type="submit" className="h-10">
              Submit
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
