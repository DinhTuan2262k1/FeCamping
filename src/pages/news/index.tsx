'use client'

import * as React from 'react'

import NewsBackgrop from 'src/views/news/NewsBackgrop'
import { Box, Grid, Typography } from '@mui/material'
import NewsSwip from 'src/views/news/NewsSwip'

// export interface IAppProps {}

export type NewsItems = {
  url: string
  title: string
  time: string
}

const newsList = [
  {
    url: 'https://vcdn1-dulich.vnecdn.net/2023/08/24/camtrai6-1692857235-8504-1692861131.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=AcNRHgDJLZtGyD-gT2Sd8w',
    title: 'News Title Lorem Ipsum Dolor Sit Amet',
    time: '1 Hour Ago'
  },
  {
    url: 'https://vcdn1-dulich.vnecdn.net/2023/08/24/camtrai6-1692857235-8504-1692861131.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=AcNRHgDJLZtGyD-gT2Sd8w',
    title: 'News Title Lorem Ipsum Dolor Sit Amet',
    time: '1 Hour Ago'
  },
  {
    url: 'https://vcdn1-dulich.vnecdn.net/2023/08/24/camtrai6-1692857235-8504-1692861131.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=AcNRHgDJLZtGyD-gT2Sd8w',
    title: 'News Title Lorem Ipsum Dolor Sit Amet',
    time: '1 Hour Ago'
  },
  {
    url: 'https://vcdn1-dulich.vnecdn.net/2023/08/24/camtrai6-1692857235-8504-1692861131.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=AcNRHgDJLZtGyD-gT2Sd8w',
    title: 'News Title Lorem Ipsum Dolor Sit Amet',
    time: '1 Hour Ago'
  }
] as NewsItems[]

const NewsBackgrops = () => {
  return (
    <Box>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '10px' }}>
        Tin tức dã ngoại
      </Typography>
      <Grid container spacing={3} paddingBottom={5} marginBottom={'10px'}>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          xl={8}
          lg={8}
          sx={{
            height: '400px'
          }}
        >
          <NewsBackgrop />
        </Grid>
        <Grid item sm={12} xs={12} md={12} xl={4} lg={4}>
          <Typography
            variant='body2'
            sx={{ border: '1px solid #B0A8B9', borderRadius: '25px', p: '20px', height: '100%' }}
          >
            Khi sơ cứu vết thương hỏ các bạn cần lưu ý vài điều quan trọng để không khiến vết thương trở nặng,...Khi sơ
            cứu vết thương hỏ các bạn cần lưu ý vài điều quan trọng để không khiến vết thương trở nặng,...Khi sơ cứu vết
            thương hỏ các bạn cần lưu ý vài điều quan trọng để không khiến vết thương trở nặng,...
          </Typography>
        </Grid>
      </Grid>
      <Box display={'flex'} gap={3} flexDirection={'column'}>
        {/* {newsWrap.map((item, index) => {
          return <NewsSwip key={index} newsList={}></NewsSwip>
        })} */}
        <NewsSwip newsList={newsList}></NewsSwip>
        <NewsSwip newsList={newsList}></NewsSwip>
      </Box>
    </Box>
  )
}

export default NewsBackgrops
