import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Typography } from '@mui/material'

import { FormProvider } from './providers/FormProvider'
import { registerFormSchema } from './schemas/register-form.schema'
import { FormInput } from './components/FormInput'
import { listEstadoOptions, listSexoOptions } from './utils/constants'

export default function Register() {
  const formMethods = useForm({
    resolver: zodResolver(registerFormSchema),
  })

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ marginBottom: '2rem' }}>
        Registro
      </Typography>
      <FormProvider
        methods={formMethods}
        onSubmit={async (values) => {
          try {
            const response = await fetch(
              'https://67ddc6fd471aaaa7428282c2.mockapi.io/api/v1/user',
              {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              }
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
          <Typography variant="h6">Dados pessoais</Typography>
          <FormInput.Text
            name="nome"
            label="Nome"
            aria-placeholder="Digite seu nome"
            autoFocus
          />
          <FormInput.Text
            name="sobrenome"
            label="Sobrenome"
            aria-placeholder="Digite seu sobrenome"
          />
          <FormInput.Text
            name="cpf"
            label="CPF"
            aria-placeholder="Digite seu CPF"
          />
          <FormInput.Select
            name="sexo"
            label="Sexo"
            options={listSexoOptions}
          />

          <FormInput.Text
            name="dataNascimento"
            label="Data de nascimento"
            aria-placeholder="Digite seu CPF"
            type="date"
          />

          <Typography variant="h6">Endereço</Typography>
          <FormInput.Text
            name="cep"
            label="CEP"
            aria-placeholder="Digite seu CEP"
          />
          <FormInput.Text name="cidade" label="Cidade" />
          <FormInput.Select
            name="estado"
            label="Estado"
            options={listEstadoOptions}
          />
          <FormInput.Text name="logradouro" label="Logradouro" />
          <FormInput.Text name="bairro" label="Bairro" />
          <FormInput.Text name="complemento" label="Complemento" />

          <Typography variant="h6">Dados de acesso</Typography>
          <FormInput.Text
            name="email"
            label="Email"
            autoComplete="emateste@mail.com"
            aria-placeholder="Digite seu email"
          />
          <FormInput.Text
            type="password"
            name="senha"
            label="Senha"
            aria-placeholder="Digite uma senha"
          />
          <Button type="submit" variant="contained" fullWidth>
            Enviar
          </Button>
        </Box>
      </FormProvider>
    </Card>
  )
}
