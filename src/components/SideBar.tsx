import { PropsWithChildren } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, Drawer, IconButton, Divider } from '@mui/material'

type SideBarProps = PropsWithChildren & {
  open: boolean
  handleDrawerClose: VoidFunction
}

const drawerWidth = 240

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export function SideBar({ children, open, handleDrawerClose }: SideBarProps) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  )
}
