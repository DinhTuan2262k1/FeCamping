import { Box, Typography } from '@mui/material'
import { Fragment } from 'react'

const widthLeft = 250

export default function TabProductMoreInformation() {
  return (
    <Fragment>
      <Box display={'flex'} flexDirection={'row'} gap={3}>
        <Typography fontWeight={700} sx={{
          width: widthLeft, textTransform: 'uppercase',
        }}>
          Vui lòng chọn số ngày thuê:
        </Typography>
        <Typography>1 Ngày, 1.5 Ngày, 2 Ngày, 2.5 Ngày, 3 Ngày</Typography>
      </Box>
    </Fragment>
  )
}
