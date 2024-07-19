import { Box, TextField } from '@mui/material'
import * as React from 'react'
import { isNumber } from 'src/@core/layouts/utils'

export interface IInputOTPFieldProps {
  length: number
  otpCode: string[]
  setOtpCode: (value: string[]) => void
}

export default function InputOTPField({ length, otpCode, setOtpCode }: IInputOTPFieldProps) {
  const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const value = e.key

    const result = [...otpCode]
    if (value === 'Backspace') {
      result.splice(otpCode.length - 1, 1)

      setOtpCode([...result])

      return
    }

    if (!isNumber(value)) return

    result.push(value)
    if (result.length > length) result.splice(0, 1)

    setOtpCode([...result])
  }


  const onFocus = (value: boolean) => {
    const parent = document.querySelectorAll('.focused')
    if (value) {
      parent.forEach((child) => child.querySelector('div')?.classList.add('Mui-focused'))

    } else {
      parent.forEach((child) => child.querySelector('div')?.classList.remove('Mui-focused'))

    }
  }

  return (
    <Box display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} gap={3}>
      {Array.from({ length: length }, (_, i) => i + 1).map((item) => {
        return (
          <TextField
            className='focused'
            inputProps={{
              autoComplete: 'off',
              style: {
                textAlign: 'center',
              },
            }}
            onFocus={() => {
              onFocus(true)
            }}
            onBlur={() => {
              onFocus(false)
            }}
            name={`otp-code-${item}`}
            key={item}
            value={`${otpCode.at(item - 1) || ''}`}
            onKeyDown={handleChange}
            sx={{
              width: '60px',
              outline: 0,
              'MuiTextField-root': {
                border: '1px solid red',
              },
            }}
          />
        )
      })}
    </Box>
  )
}
