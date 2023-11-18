'use client'

import { useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

export default function MediaCard({ heading, text, url }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Modal
        sx={{ zIndex: 2 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="outlined-basic"
              label="Project URL"
              variant="outlined"
              placeholder="Project UR"
              value={url}
              disabled={true}
              sx={{ mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Pull request number"
              variant="outlined"
              placeholder="Pull request number"
              sx={{ mb: 2 }}
            />
            <Button onClick={handleClose}>Claim Reward</Button>
          </Box>
        </Box>
      </Modal>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link href={url} target="_blank">
              {heading}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Submit Pull Request
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
