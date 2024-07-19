// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Grid, Link } from '@mui/material'
import { ArrowRight } from 'mdi-material-ui'

// Styled component for the diagonal split effect

const NewsCard = ({
  title = '',
  content = '',
  url = '',
  index = 0
}: {
  title: string
  content: string
  url: string
  index: number
}) => {
  return (
    <Card
      sx={{
        position: 'relative',
        backgroundImage:
          index === 0
            ? 'linear-gradient(to right bottom, #fe8f66, #ffa4aa, #ffc3de, #f9e3fa, #ffffff);'
            : index === 3
            ? 'linear-gradient(to right, #01dea3, #01dea3, #01dea3, #01dea3, #01dea3, #00e3bf, #00e6d7, #1ae9eb, #7aedff, #bcefff, #e9f4ff, #ffffff);'
            : '',
        borderRadius: '25px'
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'top'
        }}
      >
        <Box
          sx={{
            width: '60%'
          }}
        >
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              width: '80%'
            }}
          >
            {content}
          </Typography>
          <Button size='small' startIcon={<ArrowRight />}>
            <Link href='/news'>Đọc thêm</Link>
          </Button>
        </Box>
        <Box
          sx={{
            width: '40%'
          }}
        >
          <CardMedia component={'img'} image={url} />
        </Box>
      </CardContent>
    </Card>
  )
}

const NewsWithCollapse = () => {
  return (
    <Grid container spacing={6}>
      {[1, 2, 3, 4].map((item, index) => {
        return (
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} key={index}>
            <NewsCard
              content='Khi sơ cứu vết thương hỏ các bạn cần lưu ý vài điều quan trọng để không khiến vết thương trở nặng,...'
              title='Sơ cứu vết thương hỏ: 5 lưu ý quan trọng bạn cần biết'
              url='https://dulichhanoi.vn/wp-content/uploads/2021/05/Camping-la-gi-800.jpg'
              index={index}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default NewsWithCollapse
