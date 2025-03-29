import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Desafio Matera - Frontend</h1>
    </ThemeProvider>
  )
}

export default App
