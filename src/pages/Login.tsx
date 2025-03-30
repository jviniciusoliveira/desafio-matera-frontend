import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Box, Button, Card, Divider, Typography } from '@mui/material'

import { FormProvider } from '@/providers/FormProvider'
import { FormInput } from '@/components/FormInput'
import {
  loginFormDefaultValues,
  loginFormSchema,
} from '@/schemas/login-form.schema'
import { useAuth } from '@/hooks/useAuth'
import { getUserByEmail } from '@/services/api/users'

export default function Login() {
  const { login } = useAuth()

  const formMethods = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(loginFormSchema),
  })

  const mutation = useMutation({
    mutationFn: getUserByEmail,
    onSuccess: login,
  })

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: '450px',
        padding: '2rem',
      }}
    >
      <Typography component="h1" variant="h5" sx={{ marginBottom: '2rem' }}>
        Login
      </Typography>
      <FormProvider
        methods={formMethods}
        onSubmit={({ email }) => mutation.mutate(email)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 4,
          }}
        >
          <FormInput.Text
            name="email"
            label="Email"
            aria-placeholder="Digite seu email"
          />
          <FormInput.Text
            name="senha"
            label="Senha"
            type="password"
            aria-placeholder="Digite sua senha"
          />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Entrar
          </Button>
        </Box>
        <Divider sx={{ marginY: '2rem' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Não tem cadastro? <Link to="/register">Registre-se</Link>
          </Typography>
        </Box>
      </FormProvider>
    </Card>
  )
}
