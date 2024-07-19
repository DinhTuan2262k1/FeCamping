import { Box, Typography } from '@mui/material'
import { Product } from 'src/@core/type/product'

export interface ITabProductInformationProps {
  product: Product
}

export default function TabProductInformation({product}: ITabProductInformationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Typography variant='h5' fontWeight={800}>
        Thông tin chi tiết của sản phẩm
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          gap: 3
        }}
      >
        <Typography variant='body1' fontWeight={700}>
          {product.sellerName}
        </Typography>
        <Typography variant='body2'>{product.postDate}</Typography>
      </Box>
      <Typography
        sx={{
          whiteSpace: 'pre-wrap'
        }}
      >
        {
          product.description
        }
      </Typography>
    </Box>
  )
}
