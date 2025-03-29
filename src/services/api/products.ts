import { httpClient } from './httpClient'

type Product = {
  createdAt: string
  nome: string
  image: string
  preco: string
  qt_estoque: number
  qt_vendas: number
  marca: string
  id: string
}

export async function getProducts() {
  const response = await httpClient.get('/product')
  return response.data
}

export async function getProductById(productId: string) {
  const response = await httpClient.get(`/product/${productId}`)
  return response.data
}

export async function getProductByQuery(query: string) {
  const response = await httpClient.get(`/product?search${query}`)
  return response.data
}

export async function createProduct(data: Product) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = data
  const response = await httpClient.post('/product', rest)
  return response.data
}

export async function updateProduct(data: Product) {
  const response = await httpClient.put(`/product/${data.id}`, data)
  return response.data
}

export async function deleteProduct(productId: string) {
  const response = await httpClient.delete(`/product/${productId}`)
  return response.data
}
