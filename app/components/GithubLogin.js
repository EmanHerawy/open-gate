import { useSession, signIn, signOut } from 'next-auth/react'

import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function GithubLogin(props) {
  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  if (session) {
    return (
      <>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          {...props}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt={session.user.name} src={session.user.image} />
            <Typography variant="p">{session.user.name}</Typography>
          </Box>
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
      </>
    )
  }
  return <Button onClick={() => signIn('github')}>Connect Github</Button>
}
