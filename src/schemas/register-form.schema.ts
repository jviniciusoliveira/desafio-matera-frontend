import { messages } from '@/utils/constants'
import { validate } from '@/utils/validators'
import dayjs from 'dayjs'
import { z } from 'zod'

export const registerFormDefaultValues = {
  nome: '',
  sobrenome: '',
  cpf: '',
  sexo: '',
  cep: '',
  cidade: '',
  estado: '',
  logradouro: '',
  bairro: '',
  complemento: '',
  email: '',
  senha: '',
}

export const registerFormSchema = z.object({
  nome: z.string().min(1, messages.M001),
  sobrenome: z.string().min(1, messages.M001),
  cpf: z
    .string()
    .min(1, messages.M001)
    .length(14, messages.M002)
    .refine((value) => validate.Cpf(value), { message: messages.M002 }),
  sexo: z.string().min(1, messages.M001),
  dt_nascimento: z
    .any()
    .refine((value) => Boolean(value), {
      message: messages.M001,
    })
    .refine((value) => dayjs(value).isValid(), {
      message: messages.M002,
    }),
  cep: z.string().min(1, messages.M001).length(9, messages.M002),
  cidade: z.string().min(1, messages.M001),
  estado: z.string().min(1, messages.M001),
  logradouro: z.string().min(1, messages.M001),
  bairro: z.string().min(1, messages.M001),
  complemento: z.string().min(1, messages.M001),
  email: z.string().min(1, messages.M001).email(messages.M002),
  senha: z
    .string()
    .min(1, messages.M001)
    .refine(
      (value) => value.length >= 6,
      'Digite uma senha com pelo menos 6 caracteres.'
    ),
})
