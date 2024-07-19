'use client'

// ** Bootstrap Imports
import 'bootstrap/dist/css/bootstrap.min.css'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Backgrop from '../views/dashboard/Backgrop'
import SwipeableImage from '../views/dashboard/SwipeableImage'
import { Button, Typography } from '@mui/material'
import SwipeableProduct from '../views/dashboard/SwipeableProduct'
import NewsWithCollapse from 'src/views/dashboard/NewsWithCollapse'
import { useState, useEffect } from 'react'
import { ProductModel, ObjectFilterProductModel, ProductResponseList, ProductType } from 'src/@core/type/product'
import { ProductAPI } from 'src/api-client/Products'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const [productLst, setProductLst] = useState<ProductModel[]>([])
  const [combo, setCombo] = useState<ProductModel[]>([])
  const { getProducts } = ProductAPI()

  const router = useRouter()

  useEffect(() => {
    const handleSearchCombo = async () => {
      try {
        const response = await getProducts({ type: ProductType[ProductType.Combo] } as ObjectFilterProductModel)

        setCombo((response as ProductResponseList).items)
      } catch (error) {}
    }

    const handleSearchProduct = async () => {
      try {
        const response = await getProducts({ type: ProductType[ProductType.Single] } as ObjectFilterProductModel)

        setProductLst((response as ProductResponseList).items)
      } catch (error) {}
    }

    handleSearchProduct()
    handleSearchCombo()
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={3} paddingBottom={5}>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          xl={8}
          lg={8}
          sx={{
            height: '400px',
          }}
        >
          <Backgrop />
        </Grid>
        <Grid item sm={12} xs={12} md={12} xl={4} lg={4}>
          <SwipeableImage />
        </Grid>
      </Grid>

      <Grid container flexDirection={'column'} paddingY={5} spacing={3}>
        <Grid item display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h6' fontWeight={700}>
            Combo hot
          </Typography>
          <Button onClick={() => router.push('/combo')}>
            <Typography
              variant='body1'
              fontWeight={700}
              sx={{
                color: (theme) => theme.palette.primary[theme.palette.mode],
              }}
            >
              Xem thêm
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <SwipeableProduct productLst={combo} />
        </Grid>
      </Grid>

      <Grid container flexDirection={'column'} paddingY={5} spacing={3}>
        <Grid item display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h6' fontWeight={700}>
            Sản phẩm hot
          </Typography>
          <Button onClick={() => router.push('/products')}>
            <Typography
              variant='body1'
              fontWeight={700}
              sx={{
                color: (theme) => theme.palette.primary[theme.palette.mode],
              }}
            >
              Xem thêm
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <SwipeableProduct productLst={productLst} />
        </Grid>
      </Grid>

      <Grid container flexDirection={'column'} paddingY={5} spacing={3}>
        <Grid item display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h6' fontWeight={700}>
            Tin tức
          </Typography>
          <Button>
            <Typography
              variant='body1'
              fontWeight={700}
              sx={{
                color: (theme) => theme.palette.primary[theme.palette.mode],
              }}
            >
              Xem thêm
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          {/* <SwipeableProduct productLst={[]} /> */}
          <NewsWithCollapse />
        </Grid>
      </Grid>

      {/* Dashboard template */}
      {/* <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid> */}
    </ApexChartWrapper>
  )
}

export default Dashboard
