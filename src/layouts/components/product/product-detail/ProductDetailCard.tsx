import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { Minus, Plus } from 'mdi-material-ui'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { KEY_COOKIE } from 'src/@core/layouts/types'
import { isNumber } from 'src/@core/layouts/utils'
import { update } from 'src/@core/slice/cartSlice'
import {
  ObjectFilterProductRetailModel,
  ProductRetailModel,
  ProductRetailResponseList,
  ProductWithRetailModel,
} from 'src/@core/type/product'
import { ProductAPI } from 'src/api-client/Products'

export type ProductDetail = {
  id: string
  name: string
  price: number
  status: string
  color: string
  description: string
  image: string
}

export interface IProductDetailCardProps {
  product: ProductDetail
  isLoading: boolean
}

export default function ProductDetailCard({
  isLoading = true,
  product = {
    id: '',
    color: '',
    description: '',
    name: '',
    price: 0,
    status: '',
    image:
      'https://product.hstatic.net/200000567871/product/eries-2019-nh18z022-p-nh18z044-p-__4__24b06f707c1648969ec6482354edadaf_07e4c5a9e4034299b53a58401d6f948d_master.jpg',
  },
}: IProductDetailCardProps) {
  const [quantity, setQuantity] = React.useState<number>(1)
  const dispatch = useDispatch()

  // const [currentImage, setCurrentImage] = React.useState<number>(0)
  const [currentProductRetail, setCurrentProductRetail] = React.useState<ProductRetailModel>()
  const [productRetailList, setProductRetailList] = React.useState<ProductRetailModel[]>([])

  const { getProductRetail } = ProductAPI()

  React.useEffect(() => {
    const handleFetchProductRetailList = async () => {
      if (productRetailList.length !== 0) return

      const response = await getProductRetail({
        productId: product.id,
      } as ObjectFilterProductRetailModel)
      setProductRetailList((response as ProductRetailResponseList).items)
      setCurrentProductRetail((response as ProductRetailResponseList).items?.at(0))
    }

    if (!product.id) return

    handleFetchProductRetailList()
  }, [product.id])

  const generateDescription = (description: string) => {
    let result = ''

    description.split('\n').map((line) => (result += '<li>' + line + '</li>'))

    return '<ul>' + result + '</ul>'
  }

  const handleClickOnCartButton = () => {
    if (typeof window === 'undefined' || !product.id || !currentProductRetail?.id) return

    const data = localStorage.getItem(KEY_COOKIE.CART)

    const list = data ? (JSON.parse(data) as ProductWithRetailModel[]) : []

    const productSame = list.filter((item) => item.id === product.id)

    if (productSame.length > 0) {
      const retailSame = productSame[0].retail.filter((item) => item.id === currentProductRetail.id)

      if (retailSame.length > 0) {
        const index = productSame[0].retail.findIndex((x) => x.id === currentProductRetail.id)

        productSame[0].retail[index].quantity += quantity
      } else {
        productSame[0].retail = [
          ...productSame[0].retail,
          {
            ...currentProductRetail,
            quantity: quantity,
          },
        ]
      }
    } else {
      const newCart = {
        id: product.id,
        name: product.name,
        categoryId: '',
        image: product.image,
        description: product.description,
        retail: [
          {
            ...currentProductRetail,
            quantity: quantity,
          },
        ],
      } as ProductWithRetailModel

      list.push(newCart)
    }

    dispatch(update(list))
  }

  return (
    <Card
      sx={{
        borderRadius: '15px',
      }}
    >
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xl lg md={12} sm={12} xs={12} container flexDirection={'column'}>
            <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'}>
              {!isLoading ? (
                <CardMedia
                  component={'img'}
                  sx={{
                    height: '400px',
                    width: 'auto',
                  }}
                  alt='product detail image'
                  image={product.image}
                />
              ) : (
                <Skeleton
                  sx={{
                    height: '400px',
                    width: 'auto',
                  }}
                />
              )}
            </Grid>
            {/* <Grid
              item
              display={'flex'}
              justifyContent={'flex-start'}
              gap={3}
              sx={{
                overflowY: 'auto',
              }}
            >
              {imgLst.map((item, index) => {
                return (
                  <CardMedia
                    key={index}
                    component={'img'}
                    alt='product detail image'
                    image={item}
                    sx={{
                      height: '80px',
                      border: '1px solid',
                      borderRadius: '10px',
                      borderColor: (theme) => theme.palette.divider,
                      cursor: 'pointer',
                      ...(currentImage !== index
                        ? {
                            opacity: 0.5,
                          }
                        : null),
                    }}
                    onClick={() => {
                      setCurrentImage(index)
                    }}
                  />
                )
              })}
            </Grid> */}
          </Grid>
          <Grid
            item
            xl
            lg
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box>
              <Typography variant='h5' fontWeight={500}>
                {product.name}
              </Typography>
              <Typography variant='h6' fontWeight={700}>
                {currentProductRetail?.unitPrice} đồng/ngày
              </Typography>
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{
                    width: '125px',
                  }}
                >
                  Tình trạng lều:
                </Typography>
                <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{
                    color: (theme) => theme.palette.primary[theme.palette.mode],
                  }}
                >
                  {product.status}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{
                    width: '125px',
                  }}
                >
                  Màu sắc:
                </Typography>
                <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{
                    color: (theme) => theme.palette.primary[theme.palette.mode],
                  }}
                >
                  {product.color}
                </Typography>
              </Box> */}
              {product.description && (
                <Typography
                  variant='body2'
                  pl={2}
                  pt={2}
                  dangerouslySetInnerHTML={{ __html: generateDescription(product?.description || '') }}
                ></Typography>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Divider />
              <Typography fontWeight={700}>Vui lòng chọn số ngày dự định thuê: </Typography>
              <Box display={'flex'} flexDirection={'row'} gap={3}>
                {productRetailList.map((item) => {
                  return (
                    <Button
                      key={item.id}
                      variant={item.id === currentProductRetail?.id ? 'contained' : 'outlined'}
                      size='small'
                      sx={{
                        borderRadius: '60px',
                        textTransform: 'none',
                      }}
                      onClick={() => {
                        if (item.id === currentProductRetail?.id) return

                        setCurrentProductRetail(item)
                      }}
                    >
                      {item.noOfDayRental} ngày
                    </Button>
                  )
                })}
              </Box>
              <Box display={'flex'} flexDirection={'row'} gap={3}>
                <Box display={'flex'} flexDirection={'row'} gap={1} alignItems={'center'}>
                  <IconButton
                    onClick={() => {
                      if (quantity === 1) return

                      setQuantity(quantity - 1)
                    }}
                  >
                    <Minus />
                  </IconButton>
                  <FormControl>
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
                      value={quantity}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setQuantity(1)

                          return
                        }

                        if (isNumber(e.target.value)) return

                        if (+e.target.value <= 0) return

                        setQuantity(+e.target.value)
                      }}
                      size='small'
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => {
                      setQuantity(quantity + 1)
                    }}
                  >
                    <Plus />
                  </IconButton>
                </Box>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleClickOnCartButton()
                  }}
                >
                  Đặt hàng
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
