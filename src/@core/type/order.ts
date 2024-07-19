import { PaginationModel } from './common'
import { UserModel } from './user'

export type OrderModel = {
  id: string
  invoiceId: string
  createdDate: string
  completedDate: string
  totalAmount: number
  discount: number
  finalAmount: number
  note: string
  status: string
  userId: string
}

export type OrderReponseListModel = PaginationModel & {
  items: OrderModel[]
}

export interface OrderDetailModel {
  orderId: string
  invoiceId: string
  createdDate: string
  completedDate: string
  productList: ProductOrderDetailModel[]
  totalAmount: number
  discount: number
  finalAmount: number
  note: string
  status: string
  userInfo: UserModel
}

export interface ProductOrderDetailModel {
  orderDetailId: string
  productRetailId: string
  productName: string
  noOfDayRental: number
  quantity: number
  sellingPrice: number
  totalAmount: number
  productImg: string
}

export interface OrderCreateModel {
  userInfo: UserModel
  productList: ProductCreateOrder[]
  totalAmount: number
  discount: number
  finalAmount: number
  note: string
}

export interface ProductCreateOrder {
  productRetailId: string
  quantity: number
  sellingPrice: number
}

