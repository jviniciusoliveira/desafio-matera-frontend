import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/services/api/products'

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

export function useProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data = [] } = useQuery<unknown, unknown, Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  /**
   * TODO: O ideal seria filtrar e paginar através da Api, porém a Api deveria
   *  retornar um campo com a quantidade total de itens ou a quantidade de páginas.
   * */

  const filteredProducts = useMemo(() => {
    if (!searchTerm?.trim()) {
      return data
    }
    return data.filter((product) =>
      product.nome.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  }, [data, searchTerm])

  const start = (currentPage - 1) * 5
  const end = start + 5
  const paginatedProducts = filteredProducts.slice(start, end)

  return {
    currentPage,
    totalPages: Math.ceil(filteredProducts.length / 5),
    searchTerm,
    products: paginatedProducts,
    setCurrentPage,
    setSearchTerm,
  }
}
