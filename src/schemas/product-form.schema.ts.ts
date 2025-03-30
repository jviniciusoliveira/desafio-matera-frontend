import { messages } from '@/utils/constants'
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
  nome: z.string().min(1, messages.M001),
  marca: z.string().min(1, messages.M001),
  preco: z.string().min(1, messages.M001),
  qt_estoque: z.coerce.number().positive(messages.M001),
  qt_vendas: z.coerce.number().positive(messages.M001),
  image: z.string().min(1, messages.M001),
  createdAt: z.string(),
  id: z.string(),
})
