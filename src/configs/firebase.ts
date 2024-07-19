import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC2pf3yJ3umesp1oYkhVIrxul1Wp2A5cWI',
  authDomain: 'campingtogether-9e4d5.firebaseapp.com',
  projectId: 'campingtogether-9e4d5',
  storageBucket: 'campingtogether-9e4d5.appspot.com',
  messagingSenderId: '859047003879',
  appId: '1:859047003879:web:8946e311bc2277e653c442',
  measurementId: 'G-WX3N9HREME',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
