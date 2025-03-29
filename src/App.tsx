import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router'
import { router } from './router'

const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Desafio Matera - Frontend</h1>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
