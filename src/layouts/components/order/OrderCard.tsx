import { Box, Card, CardContent, CardHeader, Chip, Divider, Stack, Typography } from '@mui/material'
import * as React from 'react'
import { formatDateYYYY_MM_DDHHMMSS, formatMoney } from 'src/@core/layouts/utils'
import { OrderDetailModel, OrderModel } from 'src/@core/type/order'
import ExpandLoading from '../loading/ExpandLoading'
import { OrderAPI } from 'src/api-client/Orders'
import { useState } from 'react'
import ProductOrderDetail from './ProductOrderDetail'

export interface IOrderCardProps {
  data: OrderModel
}

export default function OrderCard({ data }: IOrderCardProps) {
  const { getOrderDetiail } = OrderAPI()
  const [orderDetail, setOrderDetail] = useState<OrderDetailModel>()

  const fetchOrderDetail = async (id: string) => {
    try {
      const response = await getOrderDetiail(id)
      setOrderDetail(response)
      console.log(response, orderDetail)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardHeader
        title={
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography>
              Mã đơn:
              <Typography
                component={'span'}
                mx={2}
                sx={{
                  textDecoration: 'underline',
                  color: (theme) => theme.palette.primary[theme.palette.mode],
                }}
              >
                {data.invoiceId}
              </Typography>
            </Typography>
            <Typography>{formatDateYYYY_MM_DDHHMMSS(data.createdDate)}</Typography>
          </Box>
        }
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      />
      <CardContent
        sx={{
          margin: '10px',
          display: 'flex',
          gap: 3,
          flexDirection: 'column',
        }}
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={10}>
          <Typography>Trạng thái</Typography>
          <Chip label={data.status} />
        </Box>
        <Typography>
          Ghi chú: <Typography component={'span'}>{data.note}</Typography>
        </Typography>
        <ExpandLoading
          expandCallback={() => {
            fetchOrderDetail(data.id)
          }}
        >
          <Typography fontWeight={600}>Danh sách sản phẩm</Typography>
          <Stack direction={'column'} divider={<Divider />}>
            {orderDetail?.productList.map((productOrder, index) => {
              return <ProductOrderDetail key={index} data={productOrder} />
            })}
          </Stack>
        </ExpandLoading>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={10}
          sx={{
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography>Tổng hóa đơn</Typography>
          <Typography fontWeight={650}>{formatMoney(data.finalAmount) + ' VNĐ'}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
