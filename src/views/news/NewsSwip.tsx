import * as React from 'react'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'
import SwipeableViews from 'react-swipeable-views'
import { Button, Card, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { NewsItems } from 'src/pages/news'
import { useRouter } from 'next/router'

export class Product {
  name: string
  imgPath: string

  constructor(value: Partial<Product>) {
    this.name = value.name || ''
    this.imgPath = value.imgPath || ''
  }
}

const images = [
  {
    name: 'NATUREHIKE P-SERIES NH18Z022-P LỀU 2 NGƯỜI',
    imgPath:
      'https://product.hstatic.net/200000567871/product/eries-2019-nh18z022-p-nh18z044-p-__4__24b06f707c1648969ec6482354edadaf_07e4c5a9e4034299b53a58401d6f948d_master.jpg'
  },
  {
    name: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    name: 'Bird',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    name: 'Bali, Indonesia',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
  },
  {
    name: 'Goč, Serbia',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
] as Product[]

export interface ISwipeableProductProps {
  newsList: NewsItems[]
}

export default function NewsSwip({ newsList = [] }: ISwipeableProductProps) {
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length
  const [productShows, setProductShows] = React.useState<NewsItems[][]>([])

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const route = useRouter()

  const handle = () => {
    route.push('views/news/NewsDetails')
  }

  React.useEffect(() => {
    const sliceListIntoListOfThreeElements = (list: NewsItems[], numElement: number): NewsItems[][] => {
      const result: NewsItems[][] = []
      let sublist: NewsItems[] = []

      for (let i = 0; i < list.length; i++) {
        sublist.push(list[i])
        if (sublist.length === numElement || i === list.length - 1) {
          result.push(sublist)
          sublist = []
        }
      }

      return result
    }

    setProductShows(sliceListIntoListOfThreeElements(newsList, 3))
  }, [newsList])

  return (
    <Box sx={{ height: '300px', position: 'relative' }}>
      <SwipeableViews axis={'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {productShows.map((productShow, index) => (
          <Grid container key={index} flexDirection={'row'} spacing={3} flexWrap={'nowrap'}>
            {productShow.map((product, i) => {
              return (
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4} key={i}>
                  <Card
                    sx={{
                      height: '300px',
                      borderRadius: '20px'
                    }}
                  >
                    <CardMedia
                      onClick={() => {
                        handle()
                      }}
                      component={'img'}
                      image={product.url}
                      alt='backgrop'
                      sx={{
                        width: '100%',
                        height: '60%'
                      }}
                    />
                    <Typography textAlign={'center'} padding={2} sx={{ fontWeight: 'bold' }}>
                      {product.title}
                    </Typography>
                    <Typography textAlign={'left'} padding={2}>
                      {product.time}
                    </Typography>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={productShows.length}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1} variant='contained'>
            <KeyboardArrowRight fontSize='large' />
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0} variant='contained'>
            <KeyboardArrowLeft fontSize='large' />
          </Button>
        }
        sx={{
          position: 'absolute',
          width: '100%',
          top: '50%',
          background: 'none',
          '& .MuiMobileStepper-dot': {
            display: 'none'
          }
        }}
      />
    </Box>
  )
}
