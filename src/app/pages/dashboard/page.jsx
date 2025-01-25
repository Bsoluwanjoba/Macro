import UserStatistics from '@/app/components/pages-import/dashboard-import/admin/dashboard-stat/UserStat'
import { Box } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Box className='pt-[1em] pr-[10em]'>
        <UserStatistics />
    </Box>
  )
}
