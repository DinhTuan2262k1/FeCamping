import { FirebaseContext, FirebaseContextValue } from './../context/firebaseContext'
import { useContext } from 'react'

const useFirebase = (): FirebaseContextValue => useContext(FirebaseContext)

export default useFirebase
