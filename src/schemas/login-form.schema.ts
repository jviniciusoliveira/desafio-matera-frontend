import { z } from 'zod'

export const loginFormDefaultValues = {
  email: '',
  senha: '',
}

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Preenchimento obrigatório.')
    .email('Digite um email válido.'),
  senha: z
    .string()
    .min(1, 'Preenchimento obrigatório.')
    .refine((value) => value.length >= 6, {
      message: 'Sua senha tem pelo menos 6 caracteres.',
    }),
})
