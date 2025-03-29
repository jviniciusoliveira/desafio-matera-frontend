import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import GuestLayout from './pages/_layout/GuestLayout'
import Dashboard from './pages/Dashboard'
import GuardRoute from './components/GuardRoute'
import AppLayout from './pages/_layout/AppLayout'
import ProductList from './pages/ProductList'

export const router = createBrowserRouter([
  {
    element: (
      <GuardRoute>
        <GuestLayout />
      </GuardRoute>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
    errorElement: <h1>Página não encontrada</h1>,
  },
  {
    element: (
      <GuardRoute isPrivate>
        <AppLayout />
      </GuardRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
    ],
    errorElement: <h1>Página não encontrada</h1>,
  },
])
