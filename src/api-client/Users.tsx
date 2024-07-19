import useAxios from 'src/@core/hooks/useAxios'

export const UserAPI = () => {
  const axios = useAxios()

  const getUserByPhone = (phone: string) => {
    return axios.call('get', '/users?phoneNumber=' + phone)
  }

  return { getUserByPhone }
}
