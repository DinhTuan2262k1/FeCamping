import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Divider,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import useAxios from 'src/@core/hooks/useAxios'
import { deleteCart } from 'src/@core/slice/cartSlice'
import { OrderCreateModel } from 'src/@core/type/order'
import { UserModel } from 'src/@core/type/user'

export interface ConfirmPaymentDialogProps {
  open: boolean
  user: UserModel
  amount: string
  order: OrderCreateModel
  note: string
  handleClose: () => void
}

export default function ConfirmPaymentDialog({ open, user, amount, order, handleClose }: ConfirmPaymentDialogProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log({ open, user, amount, order })
  }, [open, user, amount, order])

  const axios = useAxios()

  const handleClickConfirm = async () => {
    try {
      await axios.call('post', '/orders', order, true)
      dispatch(deleteCart())
      toast.success('Đơn hàng đã đươc tạo thành công!!!')

      router.push('/check-history')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '90vw',
        },
      }}
    >
      <Card
        sx={{
          padding: '20px',
        }}
      >
        <CardHeader
          title={
            <Typography variant='h6' fontWeight={700}>
              Xác nhận thông tin thanh toán
            </Typography>
          }
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
            }}
          >
            <CardMedia component={'img'} alt='QR_code' src='/images/vietqr.jpg' />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Typography fontWeight={700}>
              Tên khách hàng: <Typography component={'span'}>{user.fullName}</Typography>
            </Typography>
            <Typography fontWeight={700}>
              Số điện thoại: <Typography component={'span'}>{user.phoneNumber}</Typography>
            </Typography>
            <Typography fontWeight={700} maxWidth={'400px'}>
              Email: <Typography component={'span'}>{user.email}</Typography>
            </Typography>
            <Typography fontWeight={700} maxWidth={'400px'}>
              Địa chỉ: <Typography component={'span'}>{user.address}</Typography>
            </Typography>
            <Typography fontWeight={700} maxWidth={'400px'}>
              Ghi chú: <Typography component={'span'}>{order.note}</Typography>
            </Typography>
            <Divider />
            <Typography fontWeight={700}>
              Tổng thanh toán: <Typography component={'span'}>{amount}</Typography>
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              handleClose()
            }}
          >
            Đóng
          </Button>
          <Button variant='contained' onClick={handleClickConfirm}>
            Xác nhận
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
