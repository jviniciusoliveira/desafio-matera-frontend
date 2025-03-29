import { z } from 'zod'

export const productFormDefaultValues = {
  nome: '',
  marca: '',
  preco: '',
  qt_estoque: 0,
  qt_vendas: 0,
  image: '',
  createdAt: '',
  id: '',
}

export const productFormSchema = z.object({
  nome: z.string().min(1, 'Preenchimento obrigatório.'),
  marca: z.string().min(1, 'Preenchimento obrigatório.'),
  preco: z.string().min(1, 'Preenchimento obrigatório.'),
  qt_estoque: z.coerce.number().positive('Preenchimento obrigatório.'),
  qt_vendas: z.coerce.number().positive('Preenchimento obrigatório.'),
  image: z.string().min(1, 'Preenchimento obrigatório.'),
  createdAt: z.string(),
  id: z.string(),
})
