import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Chip,
  FormControl,
  IconButton,
  Menu,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Cart, Close, Minus, Plus } from 'mdi-material-ui'
import { Fragment, SyntheticEvent, useEffect, useState } from 'react'
import { isNumber } from '../../utils'
import { deleteProduct, deleteRetial, getAllCart, updateRetailQuantity } from 'src/@core/slice/cartSlice'
import { useAppSelector } from 'src/@core/hooks/hook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export default function CartDropdown() {
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const lstCart = useAppSelector((state) => state.cart.cartLst)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getAllCart())
  }, [])

  const handleToggleMenu = (e: SyntheticEvent) => {
    setOpen(!open)
    setAnchorEl(!open ? e.currentTarget : null)
  }

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

  return (
    <Fragment>
      <IconButton
        color='inherit'
        aria-haspopup='true'
        aria-controls='customized-menu'
        onClick={(e) => handleToggleMenu(e)}
      >
        <Badge badgeContent={lstCart.length} color='success'>
          <Cart />
        </Badge>
      </IconButton>
      <Menu
        open={open && !!anchorEl}
        anchorEl={anchorEl}
        onClose={handleToggleMenu}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        sx={{
          '& .MuiPaper-root': {
            top: '60px !important',
          },
        }}
      >
        <Box>
          <Typography variant='h5' fontWeight={700} ml={5} minWidth={'400px'}>
            Giỏ hàng
          </Typography>
          {lstCart.length === 0 && (
            <Typography fontWeight={550} variant='caption' paddingX={5} paddingY={10} whiteSpace={'nowrap'}>
              Không có vật phẩm trong giỏ hàng
            </Typography>
          )}
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
                      <Box key={retailIndex} display={'flex'} flexDirection={'row'} ml={5} pb={2} alignItems={'center'}>
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
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} p={5}>
            <Typography fontWeight={800}>Tạm tính</Typography>
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
        </Box>
        <ButtonGroup
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            paddingX: '10px',
          }}
        >
          <Button fullWidth onClick={handleToggleMenu}>
            Đóng
          </Button>
          <Button
            fullWidth
            variant='contained'
            disabled={lstCart.length === 0}
            onClick={() => {
              router.push('/payment')
              setOpen(false)
            }}
          >
            Thanh toán
          </Button>
        </ButtonGroup>
      </Menu>
    </Fragment>
  )
}
