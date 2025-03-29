import { Link as RouterLink } from 'react-router'
import PageviewIcon from '@mui/icons-material/Pageview'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Fab,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useProductList } from '@/hooks/useProductList'

export default function ProductList() {
  const {
    currentPage,
    totalPages,
    products,
    searchTerm,
    setCurrentPage,
    setSearchTerm,
  } = useProductList()

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Produtos</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 6,
        }}
      >
        <TextField
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Pesquisar produto"
          sx={{ flex: 1, bgcolor: 'white' }}
        />
        <Fab
          component={RouterLink}
          to="/product/form"
          variant="extended"
          color="primary"
          size="large"
        >
          <AddIcon sx={{ mr: 1 }} />
          Cadastrar
        </Fab>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Qtd. estoque</TableCell>
              <TableCell align="center">Qtd. vendas</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={row.image}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                    />
                    {row.nome}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.marca}</TableCell>
                <TableCell align="center">{row.preco}</TableCell>
                <TableCell align="center">{row.qt_estoque}</TableCell>
                <TableCell align="center">{row.qt_vendas}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={RouterLink}
                    to={`/product/${row.id}`}
                    title="Visualizar produto"
                    aria-label="Visualizar produto"
                  >
                    <PageviewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        sx={{ alignSelf: 'center' }}
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
      />
    </Stack>
  )
}
