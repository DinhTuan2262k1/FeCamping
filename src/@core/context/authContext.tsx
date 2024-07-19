import { ReactNode, createContext, useEffect, useState } from 'react'

export type UserLoginModel = {
  username: string
  password: string
  isShop: boolean
  token: string
  fullName: string
}

export type UserLoginContext = {
  userLogin: UserLoginModel
  updateUserLogin: (user: UserLoginModel) => void
}

const initialAuth = {
  username: '',
  password: '',
  isShop: false,
  token: '',
  fullName: 'Duy Trương',
} as UserLoginModel

export const AuthContext = createContext<UserLoginContext>({
  userLogin: initialAuth,
  updateUserLogin: () => null
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userLogin, setUserLogin] = useState<UserLoginModel>(initialAuth)

  const updateUserLogin = (user: UserLoginModel) => {
    setUserLogin(user)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jsonString = localStorage.getItem('ACCOUNT')
      jsonString && localStorage.setItem('ACCOUNT', jsonString)
      const user = jsonString ? JSON.parse(jsonString) : initialAuth

      setUserLogin(user as UserLoginModel)
    }
  }, [])

  return <AuthContext.Provider value={{ userLogin, updateUserLogin }}>{children}</AuthContext.Provider>
}
