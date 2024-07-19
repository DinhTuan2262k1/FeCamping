import * as React from 'react'
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  List,
  Pagination,
  TextField,
  Typography,
} from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { CategoryModel, CategoryResponseList, CategoryType, ObjectFilterCategoryModel } from 'src/@core/type/category'
import { PaginationModel } from 'src/@core/type/common'
import { ObjectFilterProductModel, ProductModel, ProductResponseList } from 'src/@core/type/product'
import { ListFilterShopHomepage, ProductCard } from 'src/layouts/pages/ShopHomePage'
import { CategoryAPI } from 'src/api-client/Categories'
import { ProductAPI } from 'src/api-client/Products'

export default function ProductPage() {
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    size: 10,
    total: 100,
    totalPages: 0,
  })
  const [parentCategories, setParentCategories] = useState<CategoryModel[]>([])
  const [productLst, setProductLst] = useState<ProductModel[]>([])
  const [objectFilterProductModel, setObjectFilterProductModel] = useState<ObjectFilterProductModel>(
    {} as ObjectFilterProductModel
  )
  const [name, setName] = useState<string>('')

  const { getAllCategory } = CategoryAPI()
  const { getProducts } = ProductAPI()

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await getAllCategory({
          type: CategoryType[CategoryType.Parent],
        } as ObjectFilterCategoryModel)

        setParentCategories((response as CategoryResponseList).items)
        handleSearchProduct()
      } catch (error) {
        console.log(error)
      }
    }

    fetchParentCategories()
  }, [])

  useEffect(() => {
    handleSearchProduct(objectFilterProductModel)
  }, [objectFilterProductModel])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination({
      ...pagination,
      page: newPage,
    })
  }

  const handleSearchProduct = async (data?: ObjectFilterProductModel) => {
    try {
      const response = await getProducts(data ? data : objectFilterProductModel)

      setProductLst((response as ProductResponseList).items)
      setPagination(response as ProductResponseList)
    } catch (error) {}
  }

  return (
    <Box>
      <Grid container justifyContent={'space-between'} spacing={3} flexDirection={'row'}>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            flexW: 'nowrap',
          }}
        >
          <Typography variant='h6' fontWeight={700}>
            Danh mục sản phẩm
          </Typography>
          <Typography variant='body2' fontWeight={500}>
            {`${pagination.total} kết quả hiển thị`}
          </Typography>
          <FormControl>
            <TextField
              inputProps={{
                autoComplete: 'off',
              }}
              size='small'
              placeholder='Tìm kiếm'
              variant='outlined'
              sx={{
                maxWidth: '300px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  backgroundColor: 'white',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                ),
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setObjectFilterProductModel({
                    ...objectFilterProductModel,
                    name: name,
                  })
                }
              }}
            />
          </FormControl>
          <Button
            size='small'
            onClick={() =>
              setObjectFilterProductModel({
                ...objectFilterProductModel,
                name: name,
              })
            }
          >
            tìm kiếm
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} flexDirection={'row'} flexWrap={'nowrap'} mt={1}>
        <Grid
          item
          xl={4}
          lg={4}
          md
          sm
          xs
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 2,
            mt: 5,
          }}
        >
          <List disablePadding>
            {parentCategories.map((category, index) => (
              <ListFilterShopHomepage
                key={index}
                title={category.name}
                id={category.id}
                currentSelected={objectFilterProductModel.categoryId}
                setCurrentSelected={(categoryId: string) => {
                  setObjectFilterProductModel({
                    ...objectFilterProductModel,
                    categoryId: categoryId,
                  })
                }}
              />
            ))}
          </List>
        </Grid>
        {productLst.length === 0 ? (
          <Grid item xl={8} lg={8} md sm xs display={'flex'} justifyContent={'center'} width={'100%'}>
            <Typography fontWeight={550} sx={{ textAlign: 'center', mt: 10 }}>
              Không tìm thấy sản phẩm
            </Typography>
          </Grid>
        ) : (
          <Grid item container xl={8} lg={8} md sm xs alignContent={'baseline'} spacing={3} flexDirection={'column'}>
            <Grid item container spacing={3} alignContent={'baseline'}>
              {productLst.map((product, index) => {
                return (
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    md
                    sm
                    xs
                    key={index}
                    sx={{
                      height: '330px',
                    }}
                  >
                    <ProductCard product={product} />
                  </Grid>
                )
              })}
            </Grid>
            <Grid item>
              <Card
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: 2,
                  width: '100%',
                  gap: 5,
                }}
              >
                <Typography variant='body2'>
                  {(pagination.page - 1) * pagination.size + 1} -{' '}
                  {pagination.page * pagination.size > pagination.total
                    ? pagination.total
                    : pagination.page * pagination.size}{' '}
                  trên {pagination.total}
                </Typography>
                <Pagination
                  color='primary'
                  page={pagination.page}
                  count={Math.ceil(pagination.total / pagination.size)}
                  onChange={handleChangePage}
                />
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
