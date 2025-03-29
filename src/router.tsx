import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import GuestLayout from './pages/_layout/GuestLayout'
import Dashboard from './pages/Dashboard'
import GuardRoute from './components/GuardRoute'

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
  },
  {
    path: '/dashboard',
    element: (
      <GuardRoute isPrivate>
        <Dashboard />
      </GuardRoute>
    ),
  },
])
