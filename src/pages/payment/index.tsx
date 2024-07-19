import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Close, Minus, Plus } from 'mdi-material-ui'
import * as React from 'react'
import { CardBody } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/@core/hooks/hook'
import { isNumber } from 'src/@core/layouts/utils'
import { updateRetailQuantity, deleteRetial, deleteProduct } from 'src/@core/slice/cartSlice'
import { OrderCreateModel, ProductCreateOrder } from 'src/@core/type/order'
import { UserModel } from 'src/@core/type/user'
import InputOTPField from 'src/layouts/components/input/InputOTP'
import ConfirmPaymentDialog from 'src/layouts/components/payment/ConfirmPaymentDialog'
import CustomerPaymentInfo from 'src/layouts/components/payment/CustomerPaymentInfo'

export default function PaymentPage() {
  const lstCart = useAppSelector((state) => state.cart.cartLst)
  const dispatch = useDispatch()
  const [userModel, setUserModel] = React.useState<UserModel>({
    phoneNumber: '0388506387',
    fullName: 'Trần Thiện Quốc Anh',
    address: 'Suối Tiên ',
    email: 'mailtaone@gmail.com',
  } as UserModel)
  const [note, setNote] = React.useState<string>('')
  const [otpCode, setOtpCode] = React.useState<string[]>([])
  const [openInputOTP, setOpenInputOTP] = React.useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false)
  const [order, setOrder] = React.useState<OrderCreateModel>()

  // const { sendCode, verifyCode, isVerified } = useFirebase()

  const handleChangeQuantity = (quantity: number, index: number, retailIndex: number) => {
    dispatch(updateRetailQuantity({ productIndex: index, quantity: quantity, retailIndex: retailIndex }))
  }

  const removeRetail = (index: number, retailIndex: number) => {
    dispatch(
      deleteRetial({
        productIndex: index,
        retailIndex: retailIndex,
      })
    )
  }

  const handleRemoveProduct = (index: number) => {
    if (index < 0) return

    dispatch(
      deleteProduct({
        productIndex: index,
      })
    )
  }

  const handleChangeUserModel = (value: UserModel) => {
    setUserModel(value)
  }

  const handleClickPay = async () => {
    try {
      // console.log(isVerified)
      // if (isVerified) {
      //   console.log(isVerified)
      //   createNewOrder()
      //   setConfirmModalOpen(true)

      //   return
      // }
      // const result = await sendCode(userModel.phoneNumber)
      // console.log({ result, userModel })

      // if (!result) return

      // setOpenInputOTP(true)

      createNewOrder()
      setConfirmModalOpen(true)
    } catch (error) {
      console.error('Error sending verification code:', error)
    }
  }

  const handleVerifyCode = async () => {
    try {
      // const result = await verifyCode(otpCode.join(''))

      // if (!result) return

      setOpenInputOTP(false)
      createNewOrder()
      setConfirmModalOpen(true)
    } catch (error) {
      console.error('Error verifying code:', error)
    }
  }

  const createNewOrder = () => {
    const newOrder: OrderCreateModel = {
      userInfo: {
        id: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        status: '',
        firebaseUid: null,
      },
      productList: [],
      totalAmount: 0,
      discount: 0,
      finalAmount: 0,
      note: '',
    }

    newOrder.userInfo = userModel
    const productLst: ProductCreateOrder[] = lstCart
      .map((item) => {
        const result = item.retail.map((retail) => {
          return {
            productRetailId: retail.id,
            quantity: retail.quantity,
            sellingPrice: retail.unitPrice,
          } as ProductCreateOrder
        })

        return result
      })
      .flat()

    newOrder.productList = productLst
    newOrder.discount = 0

    const sum = lstCart.reduce((accumulator: any, currentValue: { retail: any[] }) => {
      const total = currentValue.retail.reduce((acc, current) => acc + current.quantity * current.unitPrice, 0)

      return accumulator + total
    }, 0)
    newOrder.finalAmount = sum
    newOrder.totalAmount = sum
    newOrder.note = note

    setOrder(newOrder)
  }

  const getAmount = () => {
    return (
      new Intl.NumberFormat().format(
        lstCart.reduce((accumulator: any, currentValue: { retail: any[] }) => {
          const total = currentValue.retail.reduce((acc, current) => acc + current.quantity * current.unitPrice, 0)

          return accumulator + total
        }, 0)
      ) + ' VNĐ'
    )
  }

  return (
    <Container
      sx={{
        minWidth: '600px',
      }}
    >
      <Typography variant='h5' fontWeight={700} textAlign={'center'} paddingBottom={'10px'}>
        Xác nhận thanh toán
      </Typography>
      <CustomerPaymentInfo
        userModel={userModel}
        handleChangeUserModel={handleChangeUserModel}
        note={note}
        handleChangeNote={setNote}
      />
      <Card
        sx={{
          my: 5,
        }}
      >
        <CardHeader
          title={
            <Typography variant='h6' fontWeight={700}>
              Sản phẩm thanh toán
            </Typography>
          }
        />
      </Card>
      {lstCart.length === 0 ? (
        <Typography textAlign={'center'} pt={30}>
          Không có vật phẩm đang chờ thanh toán
        </Typography>
      ) : (
        <Grid container flexDirection={'row'} spacing={5}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Card>
              <Stack divider={<Divider />} direction={'column'} spacing={3}>
                {lstCart.length > 0 &&
                  lstCart.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        padding={4}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: (theme) => theme.palette.divider,
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: '0px',
                            right: '10px',
                          }}
                          onClick={() => {
                            handleRemoveProduct(index)
                          }}
                        >
                          <Tooltip title='Xóa'>
                            <Close
                              sx={{
                                ':hover': {
                                  color: 'red',
                                },
                              }}
                            />
                          </Tooltip>
                        </IconButton>
                        <Box display={'flex'} flexDirection={'row'} gap={3}>
                          <CardMedia
                            component={'img'}
                            image={item.image}
                            alt={item.name}
                            sx={{
                              width: '100px !important',
                              height: '100px !important',
                            }}
                          />
                          <Box display={'flex'} flexDirection={'column'} gap={4}>
                            <Typography fontWeight={800}>{item.name}</Typography>
                            <Typography fontWeight={700} variant='body2'>
                              Tổng cộng:{' '}
                              {new Intl.NumberFormat().format(
                                item.retail.reduce((acc, current) => acc + current.quantity * current.unitPrice, 0)
                              )}{' '}
                              VNĐ
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection={'row'}
                          ml={5}
                          pb={2}
                          sx={{
                            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                            paddingY: '10px',
                          }}
                        >
                          <Typography textAlign={'left'} width={'200px'}>
                            Loại
                          </Typography>
                          <Typography textAlign={'center'}>Số lượng</Typography>
                          <Typography textAlign={'right'} width={'200px'}>
                            Tổng
                          </Typography>
                        </Box>
                        {item.retail.map((retail, retailIndex) => {
                          return (
                            <Box
                              key={retailIndex}
                              display={'flex'}
                              flexDirection={'row'}
                              ml={5}
                              pb={2}
                              alignItems={'center'}
                            >
                              <Box
                                sx={{
                                  width: '200px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Chip label={retail.noOfDayRental + ' ngày'} color='primary' variant='filled' />
                              </Box>
                              <Box
                                display={'flex'}
                                flexDirection={'row'}
                                gap={1}
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                              >
                                <IconButton
                                  onClick={() => {
                                    if (item.quantity === 1) return

                                    handleChangeQuantity(retail.quantity - 1, index, retailIndex)
                                  }}
                                >
                                  <Minus />
                                </IconButton>
                                <FormControl size='small'>
                                  <TextField
                                    name='quantity'
                                    inputProps={{
                                      autoComplete: 'off',
                                      style: {
                                        textAlign: 'center',
                                      },
                                    }}
                                    sx={{
                                      width: '70px',
                                      textAlign: 'center',
                                    }}
                                    value={retail.quantity}
                                    onChange={(e) => {
                                      if (!e.target.value) {
                                        handleChangeQuantity(1, index, retailIndex)

                                        return
                                      }

                                      if (isNumber(e.target.value)) return

                                      if (+e.target.value <= 0) return

                                      handleChangeQuantity(+e.target.value, index, retailIndex)
                                    }}
                                    size='small'
                                  />
                                </FormControl>
                                <IconButton
                                  onClick={() => {
                                    handleChangeQuantity(retail.quantity + 1, index, retailIndex)
                                  }}
                                >
                                  <Plus />
                                </IconButton>
                              </Box>
                              <Box>
                                <Typography sx={{ whiteSpace: 'nowrap', width: '180px', textAlign: 'right' }}>
                                  {new Intl.NumberFormat().format(retail.quantity * retail.unitPrice)} VNĐ
                                </Typography>
                              </Box>
                              <IconButton size='small' color='error'>
                                <Tooltip
                                  title='Xóa'
                                  onClick={() => {
                                    removeRetail(index, retailIndex)
                                  }}
                                >
                                  <Close />
                                </Tooltip>
                              </IconButton>
                            </Box>
                          )
                        })}
                      </Box>
                    )
                  })}
              </Stack>
            </Card>
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Card
              sx={{
                width: '100%',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Box
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'nowrap'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                  }}
                >
                  Tạm tính
                </Typography>
                <Typography>
                  {new Intl.NumberFormat().format(
                    lstCart.reduce((accumulator, currentValue) => {
                      const total = currentValue.retail.reduce(
                        (acc, current) => acc + current.quantity * current.unitPrice,
                        0
                      )

                      return accumulator + total
                    }, 0)
                  )}{' '}
                  VNĐ
                </Typography>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'nowrap'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                  }}
                >
                  Chiết khấu
                </Typography>
                <Typography>0%</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  flexWrap={'nowrap'}
                  justifyContent={'space-between'}
                  sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    paddingTop: '16px',
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      color: (theme) => theme.palette.primary[theme.palette.mode],
                    }}
                    variant='h5'
                  >
                    Tổng
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      color: (theme) => theme.palette.primary[theme.palette.mode],
                    }}
                  >
                    {getAmount()}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  color='primary'
                  sx={{
                    width: '100%',
                  }}
                  variant='contained'
                  onClick={handleClickPay}
                >
                  Thanh toán
                </Button>
                <div id='sign-in-button'></div>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
      <Dialog open={openInputOTP}>
        <Card
          sx={{
            padding: '20px',
          }}
        >
          <CardHeader
            title={
              <Typography variant='h6' fontWeight={700}>
                Nhập mã OTP
              </Typography>
            }
          />
          <CardBody>
            <InputOTPField length={6} otpCode={otpCode} setOtpCode={setOtpCode} />
          </CardBody>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant='contained' disabled={otpCode.length !== 6} onClick={handleVerifyCode}>
              Xác nhận
            </Button>
          </CardActions>
        </Card>
      </Dialog>
      {order && (
        <ConfirmPaymentDialog
          open={confirmModalOpen}
          user={userModel}
          amount={getAmount()}
          order={order}
          handleClose={() => {
            setConfirmModalOpen(false)
          }}
          note={note}
        />
      )}
    </Container>
  )
}
