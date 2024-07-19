import {
  ObjectFilterProductRetailModel,
  ObjectFilterProductReviewModel,
} from './../@core/type/product'
import useAxios from 'src/@core/hooks/useAxios'
import { ObjectFilterProductModel } from 'src/@core/type/product'

export const ProductAPI = () => {
  const { call } = useAxios()

  const getProducts = (payload: ObjectFilterProductModel) => {
    return call('get', '/products', payload, true)
  }

  const getProductDetail = (id: string) => call('get', '/products/' + id)

  const getProductRetail = (
    data: ObjectFilterProductRetailModel,
    isLoading?: boolean
  ) => call('get', '/productRetails/', data, isLoading)

  const getProductReviews = (
    data: ObjectFilterProductReviewModel,
    isLoading?: boolean
  ) => call('get', '/productReviews/', data, isLoading)

  return { getProducts, getProductDetail, getProductRetail, getProductReviews }
}
