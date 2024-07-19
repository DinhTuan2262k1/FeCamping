import { Box, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import * as React from 'react'
import { UserModel } from 'src/@core/type/user'
import LabelRequired from '../common/LabelRequired'
import { isInteger } from 'src/@core/layouts/utils'

export interface ICustomerPaymentInfoProps {
  userModel: UserModel
  handleChangeUserModel: (value: UserModel) => void
  note: string
  handleChangeNote: (value: string) => void
}

export default function CustomerPaymentInfo({
  userModel,
  handleChangeUserModel,
  note,
  handleChangeNote,
}: ICustomerPaymentInfoProps) {
  return (
    <Card
      sx={{
        marginY: 5,
      }}
    >
      <CardHeader
        title={
          <Typography fontWeight={700} variant='h6'>
            Thông tin khách hàng
          </Typography>
        }
      />
      <CardContent>
        <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'}>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid
              item
              sx={{
                width: '200px !important',
              }}
            >
              <LabelRequired>Tên người đặt hàng</LabelRequired>
            </Grid>
            <Grid item xl lg md={6} sm={6} xs={6}>
              <TextField
                name='name'
                value={userModel.fullName}
                placeholder='Tên người đặt hàng'
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  handleChangeUserModel({
                    ...userModel,
                    fullName: e.target.value,
                  })
                }}
              />
            </Grid>
            <Grid
              item
              sx={{
                width: '200px !important',
              }}
            >
              <LabelRequired>Số điện thoại</LabelRequired>
            </Grid>
            <Grid item xl lg md={6} sm={6} xs={6}>
              <TextField
                name='name'
                value={userModel.phoneNumber}
                placeholder='Số điện thoại'
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  if (!e.target.value) {
                    handleChangeUserModel({
                      ...userModel,
                      phoneNumber: '',
                    })
                  }

                  if (!isInteger(e.target.value)) return

                  handleChangeUserModel({
                    ...userModel,
                    phoneNumber: e.target.value,
                  })
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid
              item
              sx={{
                width: '200px !important',
              }}
            >
              <LabelRequired>Email</LabelRequired>
            </Grid>
            <Grid item xl lg md sm xs>
              <TextField
                name='name'
                value={userModel.email}
                placeholder='Địa chỉ'
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  handleChangeUserModel({
                    ...userModel,
                    email: e.target.value,
                  })
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid
              item
              sx={{
                width: '200px !important',
              }}
            >
              <LabelRequired>Địa chỉ</LabelRequired>
            </Grid>
            <Grid item xl lg md sm xs>
              <TextField
                name='name'
                value={userModel.address}
                placeholder='Địa chỉ'
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  handleChangeUserModel({
                    ...userModel,
                    address: e.target.value,
                  })
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid
              item
              sx={{
                width: '200px !important',
              }}
            >
              <Typography>Ghi chú</Typography>
            </Grid>
            <Grid item xl lg md sm xs>
              <TextField
                name='name'
                value={note}
                placeholder='Vd: gọi trước khi giao 1 giờ'
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  handleChangeNote(e.target.value)
                }}
                multiline
                minRows={2}
                maxRows={5}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
