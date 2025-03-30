import { z } from 'zod'
import { messages } from '@/utils/constants'

export const loginFormDefaultValues = {
  email: '',
  senha: '',
}

export const loginFormSchema = z.object({
  email: z.string().min(1, messages.M001).email(messages.M002),
  senha: z
    .string()
    .min(1, messages.M001)
    .refine((value) => value.length >= 6, {
      message: 'Sua senha tem pelo menos 6 caracteres.',
    }),
})
