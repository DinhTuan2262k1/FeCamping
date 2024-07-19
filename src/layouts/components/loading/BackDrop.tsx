import Backdrop from '@mui/material/Backdrop'

export interface IBackDropProps {
  open: boolean
}

export default function BackDrop(props: IBackDropProps) {
  const { open } = props

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={open} id='loading-progress'>
      <GiftLoading/>
    </Backdrop>
  )
}

export const GiftLoading = () => {
  return <img src='/images/kakaotalk-emoticon.gif' alt='Loading' width={150} />
}
