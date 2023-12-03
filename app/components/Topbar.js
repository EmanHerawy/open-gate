import { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import GithubLogin from './GithubLogin'
import ConnectWallet from './ConnectWallet'
import DeveloperLoginModal from './DeveloperLoginModal'
import OrganizationLoginModal from './OrganizationLoginModal'
import { useSession } from 'next-auth/react'

import { useIsConnected } from '@fuel-wallet/react';

export default function Topbar() {
  const { data: session } = useSession()
  const { isConnected } = useIsConnected();


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <DeveloperLoginModal onClose={handleClose} open={open} />

      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <DashboardIcon
          sx={{ color: '#fff', mr: 2, transform: 'translateY(-2px)' }}
        />
        <Typography variant="h6" noWrap component="div" color="white">
          Open Gate
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

        {session && isConnected ? (
          <>
            <ConnectWallet />
            <GithubLogin />
          </>
        ) : (
          <>
            <OrganizationLoginModal />
            <Button onClick={handleOpen}>Login As Developer</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
