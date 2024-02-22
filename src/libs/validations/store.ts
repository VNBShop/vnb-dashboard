import { z } from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const storeSchema = z.object({
  storeName: z.string().min(1, { message: 'Please enter store name' }),
  storeAddress: z.string().min(1, { message: 'Please enter store address' }),
  storePhone: z
    .string()
    .min(1, { message: 'Please enter phone number' })
    .regex(phoneRegex, 'Invalid phone number'),
  storeEmail: z
    .string()
    .min(1, { message: 'Please enter email address' })
    .email({ message: 'Invalid email address' }),
  storeOwnerEmail: z
    .string()
    .min(1, { message: 'Please enter owner email' })
    .email({ message: 'Invalid email owner address' }),
})
