import { Typography, TypographyProps } from '@mui/material'
import * as React from 'react'
import RequireSymbol from './RequireSymbol'

export interface ILabelRequiredProps extends TypographyProps {
  children: string | React.ReactNode
}

export default function LabelRequired({ children, ...props }: ILabelRequiredProps) {

  return (
    <Typography {...props}>
      {children}
      <RequireSymbol />
    </Typography>
  )
}
