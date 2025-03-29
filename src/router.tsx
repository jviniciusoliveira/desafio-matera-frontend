import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import { GuestLayout } from './pages/_layout/GuestLayout'

export const router = createBrowserRouter([
  {
    element: <GuestLayout />,
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
  },
])
