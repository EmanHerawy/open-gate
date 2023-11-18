import { useState } from 'react'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function AddProjectModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ width: '50%', mt: 5 }}
      >
        App Project
      </Button>
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
              placeholder="Project URL"
              sx={{ mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Stack Amount"
              variant="outlined"
              placeholder="Stack Amount"
              sx={{ mb: 2 }}
            />
            <Button onClick={handleClose}>App Project</Button>
          </Box>
        </Box>
      </Modal>
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
