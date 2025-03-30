import { Dayjs } from 'dayjs'
import { httpClient } from './httpClient'

type User = {
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

export async function getUserByEmail(email: string) {
  const response = await httpClient.get(`/user?email=${email}`)

  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0]
  }
  return response.data
}

// Fake login
export async function userLogin(credentials: Pick<User, 'email' | 'senha'>) {
  const user = await getUserByEmail(credentials.email)

  if (user.email !== credentials.email || user.senha !== credentials.senha) {
    throw new Error('Verifique suas credenciais e tente novamente.')
  }
  return user
}

export async function createUser(data: Partial<User>) {
  if (data.dt_nascimento && typeof data.dt_nascimento !== 'string') {
    data.dt_nascimento = data.dt_nascimento.format()
  }

  const response = await httpClient.post('/user', data)
  return response.data
}
