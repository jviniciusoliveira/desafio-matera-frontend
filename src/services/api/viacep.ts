import axios, { AxiosResponse } from 'axios'

type Address = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado: string
}

export async function getAddressByCep(cep: string) {
  const response = await axios.get<unknown, AxiosResponse<Address>>(
    `https://viacep.com.br/ws/${cep}/json`
  )

  if ('erro' in response.data) {
    throw response.data.erro
  }

  return response.data
}
