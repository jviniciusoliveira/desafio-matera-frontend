import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

type GuardRouteProps = PropsWithChildren & {
  isPrivate?: boolean
}

export default function GuardRoute({ children, isPrivate }: GuardRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/products" replace />
  }

  return children
}
