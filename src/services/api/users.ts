import { httpClient } from './httpClient'
import { User } from '@/types'

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
