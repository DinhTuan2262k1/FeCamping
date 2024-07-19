import { Box, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  ObjectFilterProductModel,
  ProductModel,
  ProductResponseList,
} from 'src/@core/type/product'
import { ProductAPI } from 'src/api-client/Products'
import { ProductCard } from 'src/layouts/pages/ShopHomePage'

export default function ProductSame({ categoryId }: { categoryId: string | undefined}) {
  const [productLst, setProductLst] = useState<ProductModel[]>([])

  const { getProducts } = ProductAPI()

  useEffect(() => {
    const handleSearchProduct = async () => {
      try {
        const response = await getProducts(
          !!categoryId
            ? ({ categoryId: categoryId } as ObjectFilterProductModel)
            : ({} as ObjectFilterProductModel)
        )

        setProductLst((response as ProductResponseList).items)
      } catch (error) {}
    }

    handleSearchProduct()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexDirection: 'column',
      }}
    >
      <Typography fontWeight={700}>Sản phẩm tương tự khác</Typography>
      <Grid item container spacing={3} alignContent={'baseline'}>
        {productLst.map((product, index) => {
          return (
            <Grid
              item
              xl={4}
              lg={4}
              md
              sm
              xs
              key={index}
              sx={{
                height: '370px',
              }}
            >
              <ProductCard product={product} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
