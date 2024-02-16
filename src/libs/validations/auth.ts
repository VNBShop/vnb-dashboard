import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Please enter emaill address',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z.string().min(1, {
    message: 'Please enter password',
  }),
})
