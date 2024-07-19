import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { CategoryModel, CategoryResponseList, CategoryType, ObjectFilterCategoryModel } from 'src/@core/type/category'
import { ProductModel } from 'src/@core/type/product'
import { CategoryAPI } from 'src/api-client/Categories'

export const ListFilterShopHomepage = ({
  title = '',
  id = '',
  currentSelected = '',
  setCurrentSelected,
}: {
  title: string
  id: string
  currentSelected: string
  setCurrentSelected: (value: string) => void
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [optionLst, setOptionLst] = useState<CategoryModel[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const { getAllCategory } = CategoryAPI()

  const handleTogglCategory = async () => {
    if (!open && id) {
      try {
        setIsFetching(true)
        const response = await getAllCategory({
          type: CategoryType[CategoryType.Child],
          parentCategoryId: id,
        } as ObjectFilterCategoryModel)

        setOptionLst((response as CategoryResponseList).items)
        setOpen(!open)
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    } else {
      setOpen(!open)
    }
  }

  return (
    <Fragment>
      <ListItemButton onClick={handleTogglCategory}>
        <ListItemText
          primary={
            <Typography
              fontWeight={400}
              sx={{
                color: (theme) => theme.palette.primary[theme.palette.mode],
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Typography>
          }
        />
        {isFetching ? <CircularProgress color='success' size={25} /> : open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {optionLst.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                onClick={() => {
                  setCurrentSelected(item.id)
                }}
                sx={{
                  borderRadius: '16px',
                  ...(currentSelected === item.id
                    ? {
                        background: (theme) => `${theme.palette.primary[theme.palette.mode]} !important`,
                        '& .MuiTypography-root': {
                          color: (theme) => `${theme.palette.primary.contrastText} !important`,
                        },
                      }
                    : null),
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>
    </Fragment>
  )
}

export const ProductCard = ({ product }: { product: ProductModel }) => {
  const router = useRouter()

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
      }}
    >
      <CardMedia
        onClick={() => {
          router.push('/products/' + product.id)
        }}
        component={'img'}
        image={product.image}
        alt='backgrop'
        sx={{
          width: '100%',
          height: '200px',
          ':hover': {
            cursor: 'pointer',
          },
        }}
      />
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'nowrap'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          paddingX: '10px',
        }}
      >
        <Typography textAlign={'left'} padding={2}>
          {product.name}
        </Typography>
        {/* <IconButton
          onClick={() => {
            router.push('/products/' + product.id)
          }}
        >
          <EyeOutline color='primary' />
        </IconButton> */}
      </Box>

      {/* <Typography fontWeight={600} paddingX={5} textAlign={'right'}>
        {product.price}đ/ngày
      </Typography> */}
      <Box display={'flex'} justifyContent={'flex-end'} mt={2} pr={4}>
        {/* <Button
          variant='outlined'
          sx={{
            borderRadius: 2,
            ':hover': {
              backgroundColor: '#da5b2c',
              color: 'white',
            },
          }}
        >
          Giỏ hàng
        </Button> */}
        <Button
        size='small'
          variant='contained'
          sx={{ borderRadius: 2 }}
          startIcon={<EyeOutline />}
          onClick={() => {
            router.push('/products/' + product.id)
          }}
        >
          Xem chi tiết
        </Button>
      </Box>
    </Card>
  )
}
