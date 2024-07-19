import { Box, Divider, Rating, Stack, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import {
  ObjectFilterProductReviewModel,
  ProductReviewModel,
  ProductReviewResponseListModel,
} from 'src/@core/type/product'
import { ProductAPI } from 'src/api-client/Products'

const widthLeft = 250

export default function TabProductRating({ productId = '' }: { productId: string }) {
  const [productReviewModelLst, setProductReviewModelLst] = useState<ProductReviewModel[]>([])
  const [rating, setRating] = useState<number>(0)
  const { getProductReviews } = ProductAPI()

  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await getProductReviews({
          productId: productId,
          size: 99999,
        } as ObjectFilterProductReviewModel)

        const lst = (response as ProductReviewResponseListModel).items
        setProductReviewModelLst(lst)
        const totalRatingStar = lst.reduce((prev, current) => {
          return prev + current.ratingStar
        }, 0)
        setRating(+(totalRatingStar / lst.length).toFixed(1))
      } catch (error) {
        console.log(error)
      }
    }

    if (!productId) return

    fetchProductReviews()
  }, [productId])

  const isRated = () => rating === 0 || !rating

  return (
    <Fragment>
      <Box display={'flex'} flexDirection={'row'} gap={3} mb={3}>
        <Typography
          fontWeight={700}
          sx={{
            width: widthLeft,
            textTransform: 'uppercase',
          }}
        >
          Đánh giá
        </Typography>
        {isRated() ? (
          <Typography>Chưa có đánh giá nào.</Typography>
        ) : (
          <Rating name='rating' defaultValue={0} value={rating} max={5} readOnly precision={0.1} />
        )}
        {isRated() ? '': <Typography>{rating} / 5</Typography>}
      </Box>
      {productReviewModelLst.length === 0 ? (
        <Typography
          sx={{
            paddingTop: '10px',
          }}
        >
          HÃY LÀ NGƯỜI ĐẦU TIÊN NHẬN XÉT “CHO THUÊ LỀU CẮM TRẠI 2 NGƯỜI SALIDA” Email của bạn sẽ không được hiển thị
          công khai. Các trường bắt buộc được đánh dấu *
        </Typography>
      ) : (
        <Stack direction={'column'} divider={<Divider />} gap={1} ml={3}>
          {productReviewModelLst.map((item, index) => {
            return (
              <Box key={index}>
                <Rating max={5} value={item.ratingStar} precision={0.1} defaultValue={0} readOnly></Rating>
                <Typography>{item.comment}</Typography>
              </Box>
            )
          })}
        </Stack>
      )}
    </Fragment>
  )
}
