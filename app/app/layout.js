import * as React from 'react'
import Box from '@mui/material/Box'

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Web3Modal } from '../context/Web3Modal'

export const metadata = {
  title: 'Open Gate',
  description: 'Open Gate',
}

const DRAWER_WIDTH = 240

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Web3Modal>
            <Topbar />
            <Sidebar width={DRAWER_WIDTH} />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                ml: `${DRAWER_WIDTH}px`,
                mt: ['48px', '56px', '64px'],
                p: 3,
              }}
            >
              {children}
            </Box>
          </Web3Modal>
        </ThemeRegistry>
      </body>
    </html>
  )
}
