import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/services/api/products'
import { Product } from '@/types'

const ITEMS_PER_PAGE = 15

export function useProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data = [], isLoading } = useQuery<unknown, unknown, Product[]>({
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

  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(start, end)

  return {
    currentPage,
    totalPages: Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
    searchTerm,
    products: paginatedProducts,
    setCurrentPage,
    setSearchTerm,
    isLoading,
  }
}
