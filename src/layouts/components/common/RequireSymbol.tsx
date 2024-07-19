import { Typography } from '@mui/material'
import * as React from 'react'


export default function RequireSymbol() {
  return <Typography component={'span'} color={'red'} sx={{
    marginX: '2px'
  }}>(*)</Typography>
}
