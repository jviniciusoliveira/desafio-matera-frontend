import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Typography } from '@mui/material'

import { FormProvider } from '@/providers/FormProvider'
import { FormInput } from '@/components/FormInput'
import {
  loginFormDefaultValues,
  loginFormSchema,
} from '@/schemas/login-form.schema'

export default function Login() {
  const formMethods = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(loginFormSchema),
  })

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ marginBottom: '2rem' }}>
        Login
      </Typography>
      <FormProvider
        methods={formMethods}
        onSubmit={async (values) => {
          try {
            const param = new URLSearchParams({
              search: values.email,
            })

            const response = await fetch(
              `https://67ddc6fd471aaaa7428282c2.mockapi.io/api/v1/user?${param}`
            )
            const result = await response.json()
            console.log(result)
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
      </FormProvider>
    </Card>
  )
}
