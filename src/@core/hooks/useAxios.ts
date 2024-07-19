import { useContext } from 'react'
import { AuthContextModel, AxiosContextModelValue } from '../context/axiosContext'

const useAxios = (): AxiosContextModelValue => useContext(AuthContextModel)

export default useAxios
