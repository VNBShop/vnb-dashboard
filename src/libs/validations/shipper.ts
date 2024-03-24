import { z } from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const shipperShema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(phoneRegex, 'Invalid phone number'),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  idNumber: z.string().min(1, 'Identify number is required'),
})
