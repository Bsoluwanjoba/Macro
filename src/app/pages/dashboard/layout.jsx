import LayoutHeader from '@/app/components/pages-import/dashboard-import/menu-bar/admin-menu-bar/LayoutHeader'
import Sidebar from '@/app/components/pages-import/dashboard-import/menu-bar/admin-menu-bar/Sidebar'
import { Box } from '@mui/material'
import React from 'react'

export default function layout({children}) {
  return (
    <Box>
        <Box>
            <LayoutHeader />
        </Box>
        <Box>
            <Sidebar />
        </Box>
       
       <Box pl={40}>
       {children}
       </Box>
    </Box>
  )
}
