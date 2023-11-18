import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'

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
      </Toolbar>
    </AppBar>
  )
}
