import { useState } from 'react'
import { Link as RouterLink, Outlet } from 'react-router'
import ShelvesIcon from '@mui/icons-material/Shelves'
import DashboardIcon from '@mui/icons-material/Dashboard'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material'

import { AppBar } from '@/components/AppBar'
import { SideBar } from '@/components/SideBar'
import { layoutDrawerWidth } from '@/utils/constants'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#f5f5f5',
  height: '100vh',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${layoutDrawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function AppLayout() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        open={drawerIsOpen}
        handleDrawerOpen={() => setDrawerIsOpen(true)}
      />
      <SideBar
        open={drawerIsOpen}
        handleDrawerClose={() => setDrawerIsOpen(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/products">
              <ListItemIcon>
                <ShelvesIcon />
              </ListItemIcon>
              <ListItemText>Produtos</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </SideBar>
      <Main open={drawerIsOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
