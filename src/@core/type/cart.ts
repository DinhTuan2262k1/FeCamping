import { KEY_COOKIE } from '../layouts/types'
import { ProductWithRetailModel } from './product'

export type CartModel = {
  name: string
  imageUrl: string
  quantity: number
  price: number
  productId: string
}

export const updateCartList = (lst: ProductWithRetailModel[]): boolean => {
  if (typeof window === 'undefined') return false

  localStorage.setItem(KEY_COOKIE.CART, JSON.stringify(lst))

  return true
}

export function copyCart(data: any): ProductWithRetailModel[] {
  return JSON.parse(JSON.stringify(data)) as ProductWithRetailModel[]
}

export const getCart = (): ProductWithRetailModel[] => {
  const data = localStorage.getItem(KEY_COOKIE.CART)

  const list = data ? (JSON.parse(data) as ProductWithRetailModel[]) : []

  return list
}
