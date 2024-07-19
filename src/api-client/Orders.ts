import useAxios from 'src/@core/hooks/useAxios'
import { UserAPI } from './Users'
import { toast } from 'react-toastify'
import { UserResponseListModel } from 'src/@core/type/user'
import { PaginationModel } from 'src/@core/type/common'

export const OrderAPI = () => {
  const { call } = useAxios()
  const user = UserAPI()

  const getOrders = async ({ phone, pagination }: { phone: string; pagination: PaginationModel }) => {
    try {
      const userResponse = await user.getUserByPhone(phone)

      const userModel = (userResponse as UserResponseListModel).items[0]
      if (!userModel) {
        toast.error(`Không tìm thấy người dùng với số điện thoại  (${phone})`)

        throw new Error('User not found')
      }

      return call('get', '/orders', {
        userId: userModel.id,
        ...pagination,
      })
    } catch (error) {
      throw error
    }
  }

  const getOrderDetiail = (orderId: string) => {
    return call('get', '/orders/' + orderId)
  }

  return { getOrders, getOrderDetiail }
}
