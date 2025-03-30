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
  nome: z.string().min(1, 'Preenchimento obrigatório.'),
  sobrenome: z.string().min(1, 'Preenchimento obrigatório.'),
  cpf: z.string().min(1, 'Preenchimento obrigatório.'),
  sexo: z.string().min(1, 'Preenchimento obrigatório.'),
  dt_nascimento: z
    .any()
    .refine((value) => Boolean(value), {
      message: 'Preenchimento obrigatório.',
    })
    .refine((value) => dayjs(value).isValid(), {
      message: 'Formato inválido.',
    }),
  cep: z
    .string()
    .min(1, 'Preenchimento obrigatório.')
    .length(9, 'Formato inválido.'),
  cidade: z.string().min(1, 'Preenchimento obrigatório.'),
  estado: z.string().min(1, 'Preenchimento obrigatório.'),
  logradouro: z.string().min(1, 'Preenchimento obrigatório.'),
  bairro: z.string().min(1, 'Preenchimento obrigatório.'),
  complemento: z.string().min(1, 'Preenchimento obrigatório.'),
  email: z
    .string()
    .min(1, 'Preenchimento obrigatório.')
    .email('Formato inválido.'),
  senha: z
    .string()
    .min(1, 'Preenchimento obrigatório.')
    .refine(
      (value) => value.length >= 6,
      'Digite uma senha com pelo menos 6 caracteres.'
    ),
})
