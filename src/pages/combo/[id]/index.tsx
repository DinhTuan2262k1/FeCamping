import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProductModel } from 'src/@core/type/product'
import { ProductAPI } from 'src/api-client/Products'
import ProductDetailCard from 'src/layouts/components/product/product-detail/ProductDetailCard'
import ProductInfomation from 'src/layouts/components/product/product-detail/ProductInfomation'
import ProductSame from 'src/layouts/components/product/product-detail/ProductSame'

export default function ProductItemDetailPage() {
  const [productDetail, setProductDetail] = useState<ProductModel>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()
  const { id } = router.query

  const { getProductDetail } = ProductAPI()

  useEffect(() => {
    const fetchProductDetial = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const response = await getProductDetail(id as string)
        setProductDetail(response as ProductModel)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductDetial()
  }, [id])

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      {productDetail && (
        <ProductDetailCard
          isLoading={isLoading}
          product={{
            id: productDetail.id || '',
            color: 'ngẫu nhiên',
            name: productDetail?.name,
            image: productDetail?.image,
            price: 40000,
            status: 'mới 50%, đã sử dụng nhiều lần, độ chốn nước không còn tốt',
            description:
              productDetail?.description ||
              'Lớp trong lưới 68, lều có 1 cửa chính, cửa có 2 lớp .Lớp Vải Ngoài 190t chống thấm tuyệt đối, có tầng đưa tầng giảm.',
          }}
        />
      )}
      <ProductInfomation productId={productDetail?.id || ''} />
      <ProductSame categoryId={productDetail?.categoryId || ''} />
    </Container>
  )
}
