import { useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'

import { layoutDrawerWidth } from '@/utils/constants'
import { useAuth } from '@/hooks/useAuth'

type StyledAppBarProps = MuiAppBarProps & {
  open?: boolean
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${layoutDrawerWidth}px)`,
        marginLeft: `${layoutDrawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

type AppBarProps = {
  open: boolean
  handleDrawerOpen: VoidFunction
}
export function AppBar({ open, handleDrawerOpen }: AppBarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { user, logout } = useAuth()

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Matera - Teste Frontend</Typography>

        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Avatar alt={`Imagem do usuário ${user?.nome}`} src={user?.image} />
          <ButtonBase
            title="Abrir menu"
            onClick={(event) => setAnchorElUser(event.currentTarget)}
          >
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {`${user?.nome} ${user?.sobrenome}`}
            </Typography>
            <ArrowDropDownIcon />
          </ButtonBase>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem onClick={logout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}
