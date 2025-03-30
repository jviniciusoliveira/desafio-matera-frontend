import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Typography, Box, Stack, LinearProgress } from '@mui/material'

import { FormInput } from '@/components/FormInput'
import { SubmitButton } from '@/components/SubmitButton'
import { FormProvider } from '@/providers/FormProvider'
import { formatToMoney } from '@/utils/format'
import {
  productFormSchema,
  productFormDefaultValues,
} from '@/schemas/product-form.schema.ts'
import {
  createProduct,
  getProductById,
  updateProduct,
} from '@/services/api/products'
import { Product } from '@/types'

type Params = {
  productId: string
}

export default function ProductForm() {
  const params = useParams<Params>()

  const { data: productData, isLoading } = useQuery<unknown, unknown, Product>({
    queryKey: ['product', params.productId],
    queryFn: () => (params.productId ? getProductById(params.productId) : null),
  })

  const mutation = useMutation({
    mutationFn: params.productId ? updateProduct : createProduct,
    onSuccess: console.log,
    onError: console.error,
  })

  const formMethods = useForm({
    defaultValues: productFormDefaultValues,
    resolver: zodResolver(productFormSchema),
  })

  useEffect(() => {
    if (productData?.id) {
      formMethods.reset({
        ...productData,
        preco: formatToMoney(productData.preco),
      })
    }
  }, [productData, formMethods])

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Cadastrar produto</Typography>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '2rem',
          marginBottom: '2rem',
          alignSelf: 'center',
        }}
      >
        <FormProvider
          methods={formMethods}
          onSubmit={(values) => mutation.mutate(values)}
          onError={(error) => console.log(error)}
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
              name="nome"
              label="Nome"
              aria-placeholder="Digite o nome do produto"
              autoFocus
            />
            <FormInput.Text
              name="marca"
              label="Marca"
              aria-placeholder="Digite a marca do produto"
            />
            <FormInput.Text
              name="preco"
              label="Preço"
              formatter={(value) => formatToMoney(value)}
              aria-placeholder="Digite o preço do produto"
            />
            <FormInput.Text
              name="qt_estoque"
              label="Quantidade em estoque"
              type="number"
              aria-placeholder="Digite a quantidade em estoque"
            />
            <FormInput.Text
              name="qt_vendas"
              label="Quantidade de vendas"
              type="number"
              aria-placeholder="Digite a quantidade de vendas"
            />
            <FormInput.Text
              name="image"
              label="Link imagem"
              aria-placeholder="Cole o link da imagem do produto"
            />
            <SubmitButton loading={mutation.isPending}>Enviar</SubmitButton>
          </Box>
        </FormProvider>
      </Card>
    </Stack>
  )
}
