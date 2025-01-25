import LandingPageNav from '@/app/components/pages-import/home-import/LandingPageNav'
import React from 'react'
import LandingPageCarousels from '../../components/pages-import/home-import/LandingPageCarousels'
import Advertisement from '../../components/pages-import/home-import/Advertisement'
import CategoryIcons from '@/app/components/pages-import/home-import/Categories'
import AboutUs from '@/app/components/pages-import/about-import/AboutUs'
import Footer from '@/app/components/footer/Footer'
import UkUsedBanner from '@/app/components/pages-import/home-import/UkUsed'
import { Stack } from '@mui/material'

export default function Home() {
  return (
    <div>
        <LandingPageNav />
       
       <Stack spacing={1} className='pt-[2rem]'>
       <LandingPageCarousels />
       </Stack>

         <section className='pt-5'>
          <UkUsedBanner />
         </section>

         <section className='pt-5'>
          <CategoryIcons />
         </section>
         

         <section className='pt-25'>
          <AboutUs />
         </section>

         <section className='pt-2'>
          <Footer />
         </section>
    </div>
  )
}
