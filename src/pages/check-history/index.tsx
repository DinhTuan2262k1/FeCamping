// import Head from 'next/head'
// import PhoneAuth from './PhoneAuth'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { Phone } from '@mui/icons-material'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { Dialpad } from 'mdi-material-ui'
import BackDrop from 'src/layouts/components/loading/BackDrop'
import useFirebase from 'src/@core/hooks/useFirebase'
import OrderHistoryList from 'src/layouts/components/order/OrderHistoryList'

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}))

const Home: React.FC = () => {
  const { sendCode, verifyCode, isVerified, phone } = useFirebase()
  const [isError, setIsError] = useState<string>('')
  const [number, setNumber] = useState<string>('')

  const [verificationCode, setVerificationCode] = useState('')
  const [isSent, setIsSent] = useState<boolean>(false)
  const [loading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setNumber(phone)
  }, [phone])

  //handle OTP firebase
  const checkEmptyPhoneNumber = () => {
    if (!number) {
      setIsError('Vui lòng nhập số điện thoại')
    } else if (!/(03|05|07|08|09|01|3|5|7|8|9|1[2|6|8|9])+([0-9]{8})\b/.test(number)) {
      setIsError('Số điện thoại không chính xác.')
    } else if (number.length !== 10) {
      setIsError('Độ dài số điện thoại không phù hợp.')
    } else {
      setIsError('')
      handleSendCode()
    }
  }

  const handleSendCode = async () => {
    try {
      const result = await sendCode(number)

      if (!result) return

      setIsSent(true)
    } catch (error) {
      console.error('Error sending verification code:', error)
    }
  }

  const handleVerifyCode = async () => {
    try {
      setIsLoading(true)
      const result = await verifyCode(verificationCode)

      if (!result) return

      toast.success('Phone number verified!')
      console.log({ ...result })
      setIsLoading(false)
    } catch (error) {
      console.error('Error verifying code:', error)
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant='h6' width={'100%'}>
        Lịch sử đặt hàng
      </Typography>
      {!isVerified ? (
        <Card sx={{ width: '750px' }}>
          <CardHeader
            title={
              <Typography fontWeight={300} variant='h6' textAlign={'center'}>
                Để xem
                <span style={{ color: '#0081CF', fontWeight: 'bold' }}> " Đơn hàng của bạn " </span>
                <br></br>
                vui lòng nhập Số điện thoại đã đặt hàng
              </Typography>
            }
          />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={4}>
                <Grid item width={'100%'}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Số điện thoại'
                    placeholder='+84 - 358582251'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      if (isSent) return

                      setNumber(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') checkEmptyPhoneNumber()
                    }}
                    error={!!isError}
                    helperText={isError}
                    disabled={isSent}
                  />
                </Grid>
                {!isSent && (
                  <Grid item width={'100%'}>
                    <Button onClick={() => checkEmptyPhoneNumber()} fullWidth variant='contained' disabled={isSent}>
                      Tiếp tục
                    </Button>
                  </Grid>
                )}
              </Grid>
              {!isSent && <div id='sign-in-button'></div>}
              {isSent && (
                <Grid container spacing={4} mt={3}>
                  <Grid item width={'100%'}>
                    <TextField
                      fullWidth
                      type='number'
                      label='OTP'
                      placeholder='+84 - 358582251'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Dialpad />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      error={!!isError}
                      helperText={isError}
                    />
                  </Grid>
                  <Grid item width={'100%'}>
                    <Button onClick={() => handleVerifyCode()} fullWidth variant='contained'>
                      Xác nhận
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Form>
          </CardContent>
        </Card>
      ) : (
        <OrderHistoryList phone={phone} verified={isVerified} />
      )}

      <BackDrop open={loading} />
    </Box>
  )
}

export default Home
