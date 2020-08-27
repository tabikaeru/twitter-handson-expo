import { Platform } from 'react-native'
import firebase from '../../repositories/firebase'
import * as AppAuth from 'expo-app-auth'

type Result = {
  success?: boolean
  canceled?: boolean
  error?: any
}

//Lesson1: アプリにログインログアウトを実装してみよう
export const signInGoogle = async (): Promise<Result> => {
  try {
    const authState = await AppAuth.authAsync({
      issuer: 'https://accounts.google.com',
      scopes: ['openid', 'profile'],
      clientId:
        Platform.OS === 'ios' ? process.env.GOOGLE_CLIENT_ID_FOR_IOS! : process.env.GOOGLE_CLIENT_ID_FOR_ANDROID!,
    })

    if (!authState.idToken) {
      return { canceled: true }
    }

    const credential = firebase.auth.GoogleAuthProvider.credential(authState.idToken)

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .catch((error) => {
        throw new Error(error)
      })

    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
