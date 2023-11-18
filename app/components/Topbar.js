import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import GithubLogin from './GithubLogin'

export default function Topbar() {
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

        {/* <ConnectButton /> */}
        <GithubLogin />
      </Toolbar>
    </AppBar>
  )
}
