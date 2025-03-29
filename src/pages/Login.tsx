import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Divider, Typography } from '@mui/material'

import { FormProvider } from '@/providers/FormProvider'
import { FormInput } from '@/components/FormInput'
import {
  loginFormDefaultValues,
  loginFormSchema,
} from '@/schemas/login-form.schema'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { login } = useAuth()

  const formMethods = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(loginFormSchema),
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
        onSubmit={async (values) => {
          try {
            const param = new URLSearchParams({
              email: values.email,
            })

            const response = await fetch(
              `https://67ddc6fd471aaaa7428282c2.mockapi.io/api/v1/user?${param}`
            )
            const result = await response.json()

            if (Array.isArray(result) && result.length > 0) {
              login(result[0])
            }
          } catch (error) {
            console.error(error)
          }
        }}
        onError={(error) => console.log('error: ', error)}
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
          <Button type="submit" variant="contained" fullWidth>
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
