import { Card, CardMedia } from '@mui/material'
import * as React from 'react'

export default function Backgrop() {
  return (
    <Card
      sx={{
        borderRadius: '20px',
        maxHeight: '400px',
        maxWidth: '800px'
      }}
    >
      <CardMedia
        component={'img'}
        image='https://leutrai.vn/wp-content/uploads/2023/12/camping-la-gi-0.jpg'
        alt='backgrop'
        sx={{
          width: '100%',
          height: '100%'
        }}
      />
    </Card>
  )
}
