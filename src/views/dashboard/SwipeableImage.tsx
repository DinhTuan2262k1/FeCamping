import * as React from 'react'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { autoPlay } from 'react-swipeable-views-utils'
import SwipeableViews from 'react-swipeable-views'
import { Card } from '@mui/material'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const images = [
  {
    label: 'NATUREHIKE P-SERIES NH18Z022-P LỀU 2 NGƯỜI',
    imgPath:
      'https://product.hstatic.net/200000567871/product/eries-2019-nh18z022-p-nh18z044-p-__4__24b06f707c1648969ec6482354edadaf_07e4c5a9e4034299b53a58401d6f948d_master.jpg'
  },
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bird',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
]

export default function SwipeableImage() {
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Card sx={{ maxWidth: 400, flexGrow: 1, borderRadius: '20px', height: '400px', position: 'relative' }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: 2,
          flexDirection: 'column',
          marginTop: '10px'
        }}
      >
        <Typography
          sx={{
            width: '100%'
          }}
          fontWeight={600}
          variant='h6'
        >
          SẢN PHẨM NỔI BẬT
        </Typography>
        <Typography width={'100%'} fontWeight={700} color={'orange'} variant='h6'>
          {images[activeStep].label}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews axis={'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%'
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={<div></div>}
        backButton={<div></div>}
      />
    </Card>
  )
}
