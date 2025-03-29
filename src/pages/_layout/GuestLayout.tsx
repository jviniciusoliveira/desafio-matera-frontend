import { Outlet } from 'react-router'
import { Link as RouterLink } from 'react-router'
import { Box, Button } from '@mui/material'

export function GuestLayout() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        component="header"
        sx={{ alignSelf: 'flex-end', padding: '1rem', marginBottom: '1rem' }}
      >
        <Button component={RouterLink} to="/login">
          Login
        </Button>
        <Button component={RouterLink} to="/register">
          Registrar-se
        </Button>
      </Box>
      <Box component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
