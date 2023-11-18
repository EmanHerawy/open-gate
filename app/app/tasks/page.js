'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GithubLogin from '@/components/GithubLogin'
import { SessionProvider } from 'next-auth/react'

export default function HomePage({ session }) {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" component="h2">
          Tasks
        </Typography>
      </Box>

      <SessionProvider session={session}>
        <GithubLogin />
      </SessionProvider>
    </Box>
  )
}
