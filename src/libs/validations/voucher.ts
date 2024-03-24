import { z } from 'zod'

export const VoucherSchema = z.object({
  voucherPercent: z.string().min(1, {
    message: 'Voucher percent is required',
  }),
  maxDiscount: z.string().min(1, {
    message: 'Max discount is required',
  }),
  quantity: z.string().min(1, {
    message: 'Quantity is required',
  }),
  startedAt: z.coerce.date(),
  expiredAt: z.coerce.date(),
})
