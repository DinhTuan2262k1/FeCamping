// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import TabProductInformation from './TabProductInformation'
import TabProductMoreInformation from './TabProductMoreInformation'
import TabProductRating from './TabProductRating'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const ProductInfomation = ({productId= ''}: {productId: string}) => {
  // ** State
  const [value, setValue] = useState<string>('rating')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  return (
    <TabContext value={value}>
      <Card
        sx={{
          borderRadius: '15px'
        }}
      >
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          {/* <Tab
            value='description'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Mô tả</TabName>
              </Box>
            }
          />
          <Tab
            value='more-information'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Thông tin bổ sung</TabName>
              </Box>
            }
          /> */}
          <Tab
            value='rating'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Đánh giá</TabName>
              </Box>
            }
          />
        </TabList>
      </Card>
      <Card
        sx={{
          borderRadius: '15px'
        }}
      >
        <TabPanel sx={{ p: 5 }} value='description'>
          <TabProductInformation
            product={{
              description:
                'Cho thuê lều cắm trại 2 người tại HiCamping là dịch vụ cho thuê lều cắm trại tốt và đa dạng nhất thành phố Hồ Chí Minh với những mẫu lều cắm trại 2 người chất lượng. Tiện lợi khi mang đi xa, dẽ dàng tháo lắp. Ngoài ra đảm bảo về độ chắc chắn, chịu được nhiều loại điều kiện thời tiết. Trên thị trường hiện nay, có rất nhiều loại lều cắm trại 2 người từ các nhãn hiệu Trung Quốc đến các dòng lều VNXK. Trong đó, nhãn hiệu Kelty VNXK đã được rất đông đảo cộng đồng dã ngoại. Cũng như những bạn trẻ đam mê cắm trại khẳng định và tin dùng. HiCamping tự hào là đơn vị cho thuê lều cắm trại 2 người dòng Kelty Salida hàng đầu tại Tp Hồ Chí Minh. Những đặc điểm nổi bật của Lều Cắm Trại 2 Người Dễ dàng tháo lắp: Vấn đề dựng lều cắm trại 2 người sẽ trở nên dễ dàng hơn với clip dựng lều đơn giản dưới đây của HiCamping. Bạn sẽ dựng thành thạo trong vòng từ 5 đến 10 phút. Không cần tốn quá nhiều thời gian và công sức trong các chuyến phượt dài ngày. Thiết kế nhỏ gọn, vừa vặn balo: Với 1 túi đựng như trong hình 60cmx20cmx20cm và trọng lượng khoảng 2kg, bạn chỉ cần gấp gọn nhẹ lều trại dành cho 2 người để vừa văn trong balo tạo sự tiện lợi nhất cho dân dã ngoại.',
              id: 'product_id',
              imgPath: '',
              name: 'product_name',
              price: 100,
              sellerName: 'Written by John doe',
              postDate: 'Monday May 20'
            }}
          />
        </TabPanel>
        <TabPanel sx={{ p: 5 }} value='more-information'>
          <TabProductMoreInformation />
        </TabPanel>
        <TabPanel sx={{ p: 5 }} value='rating'>
          <TabProductRating productId={productId} />
        </TabPanel>
      </Card>
    </TabContext>
  )
}

export default ProductInfomation
