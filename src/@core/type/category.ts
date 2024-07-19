import { PaginationModel } from './common'

export type CategoryModel = {
  id: string
  name: string
  description: string
  status: CategoryStatus
  type: CategoryType
  parentCategoryId: string | null
}

export enum CategoryType {
  Parent,
  Child
}

export enum CategoryStatus {
  Active ,
  Inactive 
}

export type CategoryResponseList = PaginationModel & {
  items: CategoryModel[]
}

export type ObjectFilterCategoryModel = {
  name?: string
  status?: CategoryStatus | string
  type?: CategoryType | string
  parentCategoryId?: string
  page?: number
  size?: number
}
