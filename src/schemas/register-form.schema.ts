import { z } from 'zod'

export const registerFormSchema = z.object({
  nome: z.string().min(1, 'Preenchimento obrigatório.'),
  sobrenome: z.string().min(1, 'Preenchimento obrigatório.'),
  cpf: z.string().min(1, 'Preenchimento obrigatório.'),
  sexo: z.string(),
  dataNascimento: z.string().min(1, 'Preenchimento obrigatório.'),
  cep: z.string().min(1, 'Preenchimento obrigatório.'),
  cidade: z.string().min(1, 'Preenchimento obrigatório.'),
  estado: z.string().min(1, 'Preenchimento obrigatório.'),
  logradouro: z.string().min(1, 'Preenchimento obrigatório.'),
  bairro: z.string().min(1, 'Preenchimento obrigatório.'),
  complemento: z.string().min(1, 'Preenchimento obrigatório.'),
  email: z.string().email('Digite um email válido.'),
  senha: z.string().min(6, 'Digite uma senha com pelo menos 6 caracteres.'),
})
