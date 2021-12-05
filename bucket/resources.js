import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD1yionCjGQGWEbkJ9kt7b0D5A_NyaDdBk',
  authDomain: 'twigs-7e94a.firebaseapp.com',
  projectId: 'twigs-7e94a',
  storageBucket: 'twigs-7e94a.appspot.com',
  messagingSenderId: '831840802064',
  appId: '1:831840802064:web:45af19d13b42ff2feac195',
  measurementId: 'G-6S713SXSD0'
}

const firebaseInit = initializeApp(firebaseConfig)
export const storage = getStorage(firebaseInit)
