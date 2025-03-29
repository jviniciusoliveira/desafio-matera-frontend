import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

export default function Register() {
  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ marginBottom: '2rem' }}>
        Registro
      </Typography>
      <Box
        component="form"
        onSubmit={async (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const data = Object.fromEntries(formData.entries())

          try {
            const response = await fetch(
              'https://67ddc6fd471aaaa7428282c2.mockapi.io/api/v1/user',
              {
                method: 'POST',
                body: JSON.stringify(data),
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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 4,
        }}
        noValidate
      >
        <Typography variant="h6">Dados pessoais</Typography>
        <FormControl>
          <FormLabel htmlFor="nome">Nome</FormLabel>
          <TextField
            id="nome"
            name="nome"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="sobrenome">Sobrenome</FormLabel>
          <TextField
            id="sobrenome"
            name="sobrenome"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="cpf">CPF</FormLabel>
          <TextField
            id="cpf"
            name="cpf"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="sexo">Sexo</FormLabel>
          <TextField
            id="sexo"
            name="sexo"
            size="small"
            variant="outlined"
            select
            fullWidth
          >
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
          </TextField>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dataNascimento">Data de nascimento</FormLabel>
          <TextField
            id="dataNascimento"
            name="dataNascimento"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <Typography variant="h6">Endereço</Typography>
        <FormControl>
          <FormLabel htmlFor="cep">CEP</FormLabel>
          <TextField
            id="cep"
            name="cep"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="cidade">Cidade</FormLabel>
          <TextField
            id="cidade"
            name="cidade"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="estado">Estado</FormLabel>
          <TextField
            id="estado"
            name="estado"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
          <TextField
            id="logradouro"
            name="logradouro"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="bairro">Bairro</FormLabel>
          <TextField
            id="bairro"
            name="bairro"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="complemento">Complemento</FormLabel>
          <TextField
            id="complemento"
            name="complemento"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>

        <Typography variant="h6">Dados de acesso</Typography>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="senha">Senha</FormLabel>
          <TextField
            id="senha"
            name="senha"
            type="password"
            size="small"
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Enviar
        </Button>
      </Box>
    </Card>
  )
}
