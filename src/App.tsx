import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Register from './Register'

const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Desafio Matera - Frontend</h1>
      <Register />
    </ThemeProvider>
  )
}

export default App
