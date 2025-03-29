import { useAuth } from '@/hooks/useAuth'
import { Button } from '@mui/material'

export default function Dashboard() {
  const { logout } = useAuth()

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <h1>Dashboard</h1>
    </div>
  )
}
