import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { AuthProvider } from './providers/AuthProvider'

const theme = createTheme({})
const queryStaleTime = 1000 * 60 // 1 MIN
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: queryStaleTime } },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
