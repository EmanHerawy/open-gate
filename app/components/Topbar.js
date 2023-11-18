import { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import GithubLogin from './GithubLogin'
import ConnectWallet from './ConnectWallet'
import LoginModal from './LoginModal'
import { useSession } from 'next-auth/react'

export default function Topbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <DashboardIcon
          sx={{ color: '#fff', mr: 2, transform: 'translateY(-2px)' }}
        />
        <Typography variant="h6" noWrap component="div" color="white">
          Open Gate
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

        {session ? (
          <>
            <ConnectWallet />
            <GithubLogin />
          </>
        ) : (
          <Button onClick={handleOpen}>Login</Button>
        )}
        <LoginModal onClose={handleClose} open={open} />
      </Toolbar>
    </AppBar>
  )
}
