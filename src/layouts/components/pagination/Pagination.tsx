import { Pagination } from '@mui/material'
import * as React from 'react'
import { PaginationModel } from 'src/@core/type/common'

export interface IPaginationCustomProps {
  pagination: PaginationModel
  handleChangeFilter: (value: number) => void
}

export default function PaginationCustom({ pagination, handleChangeFilter }: IPaginationCustomProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    handleChangeFilter(newPage)
  }

  return (
    <Pagination
      color='primary'
      page={pagination.page}
      count={Math.ceil(pagination.total / pagination.size)}
      onChange={handleChangePage}
    />
  )
}
