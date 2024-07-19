import { Box, CircularProgress, Collapse, IconButton, Tooltip } from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import * as React from 'react'

export interface IExpandLoadingProps {
  children: React.ReactNode
  expandCallback?: (data?: any) => void
}

export default function ExpandLoading({ children, expandCallback }: IExpandLoadingProps) {
  const [isFetching, setIsFetching] = React.useState<boolean>(false)
  const [isExpand, setIsExpand] = React.useState<boolean>(false)

  const handleToggleExpand = async () => {
    setIsExpand(!isExpand)

    try {
      if (!isExpand) {
        setIsFetching(true)
        expandCallback && (await expandCallback())
      }
    } catch (error) {
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <Box display={'flex'} width={'100%'} justifyContent={'center'} flexDirection={'column'}>
      <Collapse in={isExpand}>{children}</Collapse>
      <Box display={'flex'} width={'100%'} justifyContent={'center'}>
        {isFetching ? (
          <CircularProgress />
        ) : isExpand ? (
          <Tooltip title='Thu gọn' onClick={handleToggleExpand}>
            <IconButton>
              <ChevronUp />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Mở rộng' onClick={handleToggleExpand}>
            <IconButton>
              <ChevronDown />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}
