import { Box, CardMedia, Divider, Typography } from '@mui/material'
import * as React from 'react'
import { formatMoney } from 'src/@core/layouts/utils'
import { ProductOrderDetailModel } from 'src/@core/type/order'

export interface IProductOrderDetailProps {
  data: ProductOrderDetailModel
}

export default function ProductOrderDetail({ data }: IProductOrderDetailProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
      <Box
        sx={{
          width: '150px',
        }}
      >
        <CardMedia
          component={'img'}
          image={data.productImg}
        />
      </Box>
      <Box>
        <Typography variant='h6' fontWeight={800}>
          {data.productName}
        </Typography>
        <Typography fontWeight={600}>
          Số ngày thuê : <Typography component={'span'}> {data.noOfDayRental}</Typography>
        </Typography>
        <Typography fontWeight={600}>
          Số lượng : <Typography component={'span'}> {data.quantity}</Typography>
        </Typography>
        <Typography fontWeight={600}>
          Giá : <Typography component={'span'}>{formatMoney(data.sellingPrice)} VNĐ</Typography>
        </Typography>
        <Divider />
        <Typography fontWeight={600}>
          Tổng : <Typography component={'span'}>{formatMoney(data.sellingPrice)} VNĐ</Typography>
        </Typography>
      </Box>
    </Box>
  )
}
