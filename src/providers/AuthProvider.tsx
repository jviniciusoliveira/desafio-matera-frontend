import { createContext, PropsWithChildren, useState } from 'react'
import { User } from '@/types'

type AuthProviderProps = PropsWithChildren

type Store = {
  isAuthenticated: boolean
  user: User | null
  login: (_user: User) => void
  logout: VoidFunction
}

export const USER_STORAGE_KEY = '@MateraApp:User'

export const AuthContext = createContext<Store>({} as Store)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Store['user']>(() => {
    const currentUser = localStorage.getItem(USER_STORAGE_KEY)

    if (currentUser) {
      return JSON.parse(currentUser)
    }

    return null
  })

  const login = (user: User) => {
    setUser(user)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Boolean(user?.token), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
