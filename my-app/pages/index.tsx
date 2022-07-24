import Head from 'next/head'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import {useMedia} from 'react-use'


export default function Home() {
    const isMobileScreen: boolean =  useMedia("(max-width:1000px)")
  const [tooltip, setTooltip] = useState(false)

  return (
    <section className="h-full bg-center text-gray-600 body-font bg-gradient-to-r from-cyan-300 to-pink-300 overflow-y-scroll">
      
      <div className="container px-5 py-24 mx-auto">
      <Head>
        <title>test</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <div className="flex flex-wrap -mx-4 -mb-10 justify-center">
      <div className="sm:w-1/2 mb-10 px-4 text-left">
      <Box sx={{ flexGrow: 1,}}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Tooltip title="wave" arrow>
        <Grid item xs={1.5}>
        </Grid>
        </Tooltip>
        <Tooltip title="twitter" arrow  placement="bottom">
        <Grid item xs={1.5}>
        </Grid>
        </Tooltip>
        </Grid>
      </Box>
        <Card sx={{ display: 'flex', maxWidth: 1200 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' ,m: 2 }}>
          <CardContent sx={{ flex: '1 0 auto' , height:500}}>
          <Typography component="div" variant="h4">
            ミニゲーム
          </Typography>
           <Link href ="/game"><a  target="_blank">遊ぶ</a></Link>
           <br/>
        </CardContent>
      </Box>
    </Card>
       </div>
      </div>
      </div>
  </section>
  )
}
