import { useContext } from 'react'
import { AuthContext, UserLoginContext } from '../context/authContext'

const useAuth = (): UserLoginContext =>  useContext(AuthContext)

export default useAuth
