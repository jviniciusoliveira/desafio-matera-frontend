import { createContext, PropsWithChildren, useState } from 'react'

type AuthProviderProps = PropsWithChildren

type User = {
  createdAt: string
  nome: string
  image: string
  sobrenome: string
  cpf: string
  sexo: string
  dt_nascimento: number
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
  dataNascimento: string
}

type Store = {
  isAuthenticated: boolean
  user: User | null
  login: (_user: User) => void
  logout: VoidFunction
}

const STORAGE_KEY = '@MateraApp:User'

export const AuthContext = createContext<Store>({} as Store)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Store['user']>(() => {
    const currentUser = localStorage.getItem(STORAGE_KEY)

    if (currentUser) {
      return JSON.parse(currentUser)
    }

    return null
  })

  const login = (user: User) => {
    setUser(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Boolean(user?.token), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
