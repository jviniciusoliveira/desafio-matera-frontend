import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Box, Button, Card, Typography } from '@mui/material'

import { FormProvider } from '@/providers/FormProvider'
import {
  registerFormDefaultValues,
  registerFormSchema,
} from '@/schemas/register-form.schema'
import { FormInput } from '@/components/FormInput'
import { listEstadoOptions, listSexoOptions } from '@/utils/constants'
import { formatByMask } from '@/utils/format'

import { createUser } from '@/services/api/users'
import { getAddressByCep } from '@/services/api/viacep'

export default function Register() {
  const formMethods = useForm({
    defaultValues: registerFormDefaultValues,
    resolver: zodResolver(registerFormSchema),
  })

  const mutation = useMutation({
    mutationFn: createUser,
  })

  const handleCep = async () => {
    const cepIsValid = await formMethods.trigger('cep')

    if (cepIsValid) {
      try {
        const formValues = formMethods.watch()
        const address = await getAddressByCep(formValues.cep)

        formMethods.reset({
          ...formValues,
          cidade: address.localidade,
          estado: address.uf,
          logradouro: address.logradouro,
          bairro: address.bairro,
        })
      } catch (error) {
        console.error(error)
        // TODO: Adicionar Toast.
        alert('CEP não localizado. Preencha os campos de endereço manualmente.')
      }
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: '600px',
        padding: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Typography component="h1" variant="h5" sx={{ marginBottom: '2rem' }}>
        Registro
      </Typography>
      <FormProvider
        methods={formMethods}
        onSubmit={(values) => mutation.mutate(values)}
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
            formatter={(value) => formatByMask(value, '999.999.999-99')}
            aria-placeholder="Digite seu CPF"
          />
          <FormInput.Select
            name="sexo"
            label="Sexo"
            options={listSexoOptions}
          />
          <FormInput.Date name="dt_nascimento" label="Data de nascimento" />
          <Typography variant="h6">Endereço</Typography>
          <FormInput.Text
            name="cep"
            label="CEP"
            formatter={(value) => formatByMask(value, '99999-999')}
            onBlur={handleCep}
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
            aria-placeholder="Digite seu email"
          />
          <FormInput.Text
            type="password"
            name="senha"
            label="Senha"
            aria-placeholder="Digite uma senha"
          />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Enviar
          </Button>
        </Box>
      </FormProvider>
    </Card>
  )
}
