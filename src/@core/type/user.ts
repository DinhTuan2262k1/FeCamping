import { PaginationModel } from "./common"

export type UserModel = {
  id: string
  fullName: string
  phoneNumber: string
  email: string
  address: string
  status: string
  firebaseUid: any | null
}

export type UserResponseListModel = PaginationModel &  {
  items: UserModel[]
}
