'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function HomePage({ session }) {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" component="h2">
          Tasks
        </Typography>
      </Box>
    </Box>
  )
}
