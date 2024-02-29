import { z } from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const InvoiceShema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(phoneRegex, 'Invalid phone number'),
  firstName: z.string().min(1, { message: 'Customer is required' }),
})
