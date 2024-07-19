import { Container, Stack } from '@mui/material'
import * as React from 'react'
import { useEffect } from 'react'
import { OrderModel, OrderReponseListModel } from 'src/@core/type/order'
import { OrderAPI } from 'src/api-client/Orders'
import OrderCard from './OrderCard'
import { PaginationModel } from 'src/@core/type/common'

export interface IOrderHistoryListProps {
  verified: boolean
  phone: string
}

export default function OrderHistoryList({ verified = false, phone = '' }: IOrderHistoryListProps) {
  const [orderLst, setOrderLst] = React.useState<OrderModel[]>([])
  const { getOrders } = OrderAPI()
  useEffect(() => {
    if (!verified || !phone) return

    const fetchOrderLst = async () => {
      try {
        const response = await getOrders({
          pagination: {} as PaginationModel,
          phone: phone,
        })
        setOrderLst((response as OrderReponseListModel).items)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrderLst()
  }, [verified, phone])

  return (
    <Container>
      <Stack direction={'column'} alignItems={'start'} spacing={3}>
        {orderLst.map((order, index) => {
          return <OrderCard key={index} data={order} />
        })}
      </Stack>
    </Container>
  )
}
