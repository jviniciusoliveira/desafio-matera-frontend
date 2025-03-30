import { useParams, Link as RouterLink, useNavigate } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material'

import { getProductById, deleteProduct } from '@/services/api/products'
import { formatDate, formatToMoney } from '@/utils/format'
import { Product } from '@/types'
import { AppPage } from '@/components/AppPage'
import { useState } from 'react'

type Params = {
  productId: string
}

export default function ProductView() {
  const navigate = useNavigate()
  const params = useParams<Params>()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { data, isLoading } = useQuery<unknown, unknown, Product>({
    queryKey: ['product', params.productId],
    queryFn: () => (params.productId ? getProductById(params.productId) : null),
  })

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => navigate('/products'),
  })

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <>
      <AppPage.Container>
        <AppPage.Title>Produto</AppPage.Title>
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
                  onClick={() => setModalIsOpen(true)}
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
                <Typography variant="subtitle1">
                  Quantidade em estoque
                </Typography>
                <Typography variant="h6">{data?.qt_estoque}</Typography>
              </Grid>
              <Grid size={12} display="flex" flexDirection="column">
                <Typography variant="subtitle1">
                  Quantidade de vendas
                </Typography>
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
      </AppPage.Container>

      {/*
        TODO: Criar Modal base e utilizar instancias passando apenas a mensagem e ações.
      */}
      <Dialog
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Excluir produto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirma a exclusão do produto "{data?.nome}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalIsOpen(false)}>Não</Button>
          <Button
            onClick={() => {
              setModalIsOpen(false)
              mutation.mutate(String(params.productId))
            }}
            color="warning"
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
