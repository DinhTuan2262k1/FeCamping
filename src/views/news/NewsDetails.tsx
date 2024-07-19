import { Card, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

export default function NewsDetails() {
  return (
    <Card
      sx={{
        borderRadius: '20px',
        height: '388px',
        maxHeight: '400px',
        maxWidth: '800px'
      }}
    >
      <CardMedia
        component={'img'}
        image='https://cafebiz.cafebizcdn.vn/zoom/700_438/162123310254002176/2022/4/19/photo1650359374923-16503593750281373931572.jpg'
        alt='backgrop'
        sx={{
          width: '100%',
          height: '100%'
        }}
      />

      <Typography>Finibus Bonorum</Typography>
    </Card>
  )
}
