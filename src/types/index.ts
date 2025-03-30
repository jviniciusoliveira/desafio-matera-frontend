import { Dayjs } from 'dayjs'

export type Product = {
  createdAt: string
  nome: string
  image: string
  preco: string
  qt_estoque: number
  qt_vendas: number
  marca: string
  id: string
}

export type User = {
  createdAt: string
  nome: string
  image: string
  sobrenome: string
  cpf: string
  sexo: string
  dt_nascimento: string | Dayjs
  cep: string
  cidade: string
  estado: string
  logradouro: string
  bairro: string
  complemento: string
  email: string
  senha: string
  token: string
  id: string
}
