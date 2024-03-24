import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import numeral from 'numeral'
import { useForm } from 'react-hook-form'

import useCreateVoucher from '@/hooks/vouchers/useCreateVoucher'
import { voucherPercentOption } from '@/libs/constants'

import { VoucherSchema } from '@/libs/validations/voucher'

import { Voucher } from '@/types/order'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import InputNumber from '../ui/input-number'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'

export type CreateVoucherFormInput = {
  voucherPercent: string | number
  maxDiscount: string | number
  quantity: string | number
  startedAt: Date
  expiredAt: Date
}

type IProps = {
  close: () => void
  dataUpdate?: Voucher
}

export default function CreateVoucherForm({ close, dataUpdate }: IProps) {
  const form = useForm<CreateVoucherFormInput>({
    resolver: zodResolver(VoucherSchema),
    defaultValues: {
      maxDiscount: '',
      quantity: '',
      voucherPercent: '',
    },
  })

  const { loading, onCreateVoucher } = useCreateVoucher({
    onSucess: close,
    vourcherId: dataUpdate?.voucherId,
  })

  const onSubmit = (values: CreateVoucherFormInput) => {
    onCreateVoucher({
      ...values,
      maxDiscount: numeral(values?.maxDiscount)?.value() as number,
      quantity: numeral(values?.quantity)?.value() as number,
      voucherPercent: numeral(values?.voucherPercent)?.value() as number,
    })
  }

  useEffect(() => {
    if (!!JSON.stringify(dataUpdate)) {
      form.setValue(
        'expiredAt',
        dataUpdate?.expiredAt
          ? dayjs(dataUpdate?.expiredAt).toDate()
          : ('' as unknown as Date)
      )
      form.setValue(
        'startedAt',
        dataUpdate?.startedAt
          ? dayjs(dataUpdate?.startedAt).toDate()
          : ('' as unknown as Date)
      )
      form.setValue('maxDiscount', dataUpdate?.maxDiscount?.toString() ?? '')
      form.setValue('quantity', dataUpdate?.quantity?.toString() ?? '')
      form.setValue(
        'voucherPercent',
        dataUpdate?.voucherPercent?.toString() ?? ''
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!JSON.stringify(dataUpdate)])

  return (
    <Form {...form}>
      <form
        className="mt-4 grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="voucherPercent"
          render={({ field: { onChange, value } }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Select
                  key={value}
                  onValueChange={onChange}
                  value={value?.toString()}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Voucher percent" />
                  </SelectTrigger>
                  <SelectContent>
                    {voucherPercentOption?.map((item) => (
                      <SelectItem
                        key={item?.value}
                        value={item?.value?.toString()}
                      >
                        {item?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxDiscount"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormControl>
                <InputNumber
                  value={value}
                  className="h-10"
                  onChange={onChange}
                  placeholder="Max discount"
                  thousandSeparator
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormControl>
                <InputNumber
                  value={value}
                  className="h-10"
                  onChange={onChange}
                  placeholder="Quantity"
                  thousandSeparator
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startedAt"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormControl>
                <Calendar
                  buttonHeight={40}
                  mode="single"
                  className="text-black"
                  date={value}
                  onChange={onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiredAt"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormControl>
                <Calendar
                  buttonHeight={40}
                  className="text-black"
                  mode="single"
                  date={value}
                  onChange={onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" col-span-2 mt-6 flex items-center justify-center">
          <Button
            disabled={loading}
            type="submit"
            className=" h-10 w-[110px] space-x-1 rounded-lg bg-success text-white hover:cursor-pointer hover:bg-success/70"
          >
            {loading && <Spinner size={16} />}
            <span>{!!JSON.stringify(dataUpdate) ? 'Update' : 'Create'}</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
