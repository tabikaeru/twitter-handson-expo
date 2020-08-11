import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import { useAuthState } from 'react-firebase-hooks/auth'
import config from './config'

firebase.initializeApp(config)

export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const useUserAuthState = () => {
  const [user, initialising, error] = useAuthState(firebase.auth())
  return { uid: user?.uid, initialising, error }
}
export const signout = async () => {
  await firebase.auth().signOut()
}
export default firebase
