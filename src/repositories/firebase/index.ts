import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import config from './config'

firebase.initializeApp(config)

export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const auth = firebase.auth()

if (process.env.FUNCTIONS_EMULATOR_URL) {
  functions.useFunctionsEmulator(process.env.FUNCTIONS_EMULATOR_URL)
}

export const signout = async () => {
  await auth.signOut()
}

export default firebase
