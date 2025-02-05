'use client'

import './globals.css'
import * as React from 'react'
import Box from '@mui/material/Box'

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { SessionProvider } from 'next-auth/react'
import { FuelProvider } from '@fuel-wallet/react';

 
// export const metadata = {
//   title: 'Open Gate',
//   description: 'Open Gate',
// }

const DRAWER_WIDTH = 240

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeRegistry>
            <FuelProvider>

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
            </FuelProvider>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
