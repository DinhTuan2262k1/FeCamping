// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardMobile from 'src/views/cards/CardMobile'
import CardTwitter from 'src/views/cards/CardTwitter'
import CardFacebook from 'src/views/cards/CardFacebook'
import CardLinkedIn from 'src/views/cards/CardLinkedIn'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4, fontWeight: 'bold' }}>
        <Typography variant='h5'>Sản phẩm nổi bật</Typography>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <CardImgTop />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid> */}

      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <CardHorizontalRatings />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <CardAppleWatch />
      </Grid> */}
      {/* <Grid item xs={12} md={8}>
        <CardMembership />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid> */}
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Navigation Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardWithCollapse />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <CardNavigation />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigationCenter />
      </Grid> */}
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Tin tức</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardTwitter />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardFacebook />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardLinkedIn />
      </Grid>
    </Grid>
  )
}

export default CardBasic
