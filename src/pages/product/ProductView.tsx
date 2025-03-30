import { useParams, Link as RouterLink } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'

import { getProductById, deleteProduct } from '@/services/api/products'
import { formatDate, formatToMoney } from '@/utils/format'
import { Product } from '@/types'

type Params = {
  productId: string
}

export default function ProductView() {
  const params = useParams<Params>()

  const { data, isLoading } = useQuery<unknown, unknown, Product>({
    queryKey: ['product', params.productId],
    queryFn: () => (params.productId ? getProductById(params.productId) : null),
  })

  const mutation = useMutation({
    mutationFn: deleteProduct,
  })

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Produto</Typography>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          padding: '2rem',
          marginBottom: '2rem',
          alignSelf: 'center',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={12} display="flex" justifyContent="flex-end">
              <IconButton
                component={RouterLink}
                to={`/product/form/${data?.id}`}
                title="Editar produto"
                aria-label="Editar produto"
                size="large"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                title="Excluir produto"
                aria-label="Excluir produto"
                size="large"
                onClick={() => mutation.mutate(String(params.productId))}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid size={6} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Nome</Typography>
              <Typography variant="h6">{data?.nome}</Typography>
            </Grid>
            <Grid size={6} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Preço</Typography>
              <Typography variant="h6">
                {formatToMoney(String(data?.preco))}
              </Typography>
            </Grid>
            <Grid size={6} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Marca</Typography>
              <Typography variant="h6">{data?.marca}</Typography>
            </Grid>
            <Grid size={6} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Quantidade em estoque</Typography>
              <Typography variant="h6">{data?.qt_estoque}</Typography>
            </Grid>
            <Grid size={12} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Quantidade de vendas</Typography>
              <Typography variant="h6">{data?.qt_vendas}</Typography>
            </Grid>
            <Grid size={12} display="flex" flexDirection="column">
              <Typography variant="subtitle1">Cadastrado em:</Typography>
              <Typography variant="h6">
                {formatDate(String(data?.createdAt))}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Stack>
  )
}
