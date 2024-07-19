// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import { EmailNewsletter, Greenhouse, StorefrontOutline } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Trang chủ',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Thuê combo',
      icon: Greenhouse,
      path: '/combo'
    },
    {
      title: 'Thuê lều',
      icon: StorefrontOutline,
      path: '/products'
    },

    // {
    //   title: 'Thuê phụ kiện',
    //   icon: TablePicnic,
    //   path: '/product-items'
    // },
    {
      title: 'Tin tức',
      icon: EmailNewsletter,
      path: '/news'
    },
    {
      title: 'Kiểm tra đơn hàng',
      icon: AccountCogOutline,
      path: '/check-history'
    },

    // {
    //   title: 'Cài đặt',
    //   icon: CogOutline,
    //   path: '/settings'
    // },
    // {
    //   sectionTitle: 'Account'
    // },
    // {
    //   title: 'Lịch sử giao dịch',
    //   icon: History,
    //   path: '/firebase'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login'
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
