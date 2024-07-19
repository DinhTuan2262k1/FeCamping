import { PaginationModel } from './common'

export type Product = {
  name: string
  imgPath: string
  price: number
  id: string
  description: string
  sellerName: string
  postDate: string
}

export type ProductModel = {
  id: string
  name: string
  description: string
  quantity: number
  type: string
  status: string
  ratingStar: number
  categoryId: string
  image: string
  price: number
}

export type ProductResponseList = PaginationModel & {
  items: ProductModel[]
}

export enum ProductType {
  Single,
  Combo,
}

export enum ProductStatus {
  Active,
  Inactive,
}

export type ObjectFilterProductModel = {
  name: string
  type: ProductType | string
  status: ProductStatus | string
  categoryId: string
  page: number
  size: number
}

export type ProductRetailModel = {
  id: string
  productId: string
  noOfDayRental: number
  unitPrice: number
}

export type ProductRetailResponseList = PaginationModel & {
  items: ProductRetailModel[]
}

export type ObjectFilterProductRetailModel = {
  productId: string
  noOfDayRental: number
  unitPriceFrom: number
  unitPriceTo: number
  page: number
  size: number
}

export type ProductReviewModel = {
  id: string
  orderDetailId: string
  ratingStar: number
  comment: string
  userId: string
}

export type ProductReviewResponseListModel = PaginationModel & {
  items: ProductReviewModel[]
}

export type ObjectFilterProductReviewModel = {
  orderDetailId: string
  ratingStar: number
  productRetailId: string
  productId: string
  page: number
  size: number
}

export type ProductWithRetailModel = ProductModel & {
  retail: ProductRetailWithQuantityModel[]
}

export type ProductRetailWithQuantityModel = ProductRetailModel & {
  quantity: number
}
