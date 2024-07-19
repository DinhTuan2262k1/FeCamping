import useAxios from 'src/@core/hooks/useAxios'
import { ObjectFilterCategoryModel } from 'src/@core/type/category'

export const CategoryAPI = () => {
  const { call } = useAxios()

  const getAllCategory = (payload: ObjectFilterCategoryModel) =>
    call('get', '/categories', payload)

  return { getAllCategory }
}
