// ** React Imports
import { createContext, ReactNode, useState } from 'react'

// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** ThemeConfig Import

// ** Types Import
import { ThemeColor, ContentWidth } from 'src/@core/layouts/types'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from 'src/configs/firebase'

export type Settings = {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth
}

export type FirebaseContextValue = {
  verifyCode: (verificationCode: string) => any
  sendCode: (number: string) => Promise<boolean>
  isVerified: boolean
  phone: string
}

// ** Create Context
export const FirebaseContext = createContext<FirebaseContextValue>({
  verifyCode: () => null,
  sendCode: () => Promise.resolve(true),
  isVerified: false,
  phone: '',
})

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')

  //handle OTP firebase
  const checkEmptyPhoneNumber = (number: string): boolean => {
    if (!number) return false
    if (!/(03|05|07|08|09|01|3|5|7|8|9|1[2|6|8|9])+([0-9]{8})\b/.test(number)) return false
    if (number.length !== 10) return false

    return true
  }

  const sendCode = async (number: string): Promise<boolean> => {
    console.log(number)

    if (!checkEmptyPhoneNumber(number)) {
      console.log('checkEmptyPhoneNumber', { number })

      return Promise.resolve(false)
    }

    try {
      const appVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {})

      if (!appVerifier) {
        console.log('appVerifier false')

        return Promise.resolve(false)
      }

      const confirmationResult = await signInWithPhoneNumber(auth, '+84' + number, appVerifier)
      console.log(confirmationResult);
      
      window.confirmationResult = confirmationResult

      const capchar = document.getElementById('sign-in-button')
      if (capchar) {
        capchar.innerHTML = ''
      }
      setPhone(number)

      return Promise.resolve(true)
    } catch (error) {
      console.error('Error sending verification code:', error)

      return Promise.resolve(false)
    }
  }

  const verifyCode = async (verificationCode: string) => {
    try {
      const confirmationResult = window.confirmationResult
      const result = await confirmationResult.confirm(verificationCode)

      const user = result.user
      console.log('Phone number verified!', { result, user })
      toast.success('Xác thực số điện thoại thành công!')
      setIsVerified(true)

      return user
    } catch (error) {
      console.error('Error verifying code:', error)
      toast.error('Xác thực số điện thoại không thành công! Hãy nhập lại OTP')

      return false
    }
  }

  return (
    <FirebaseContext.Provider value={{ sendCode, verifyCode, isVerified, phone }}>{children}</FirebaseContext.Provider>
  )
}

export const SettingsConsumer = FirebaseContext.Consumer
