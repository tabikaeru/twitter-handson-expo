import { Platform } from 'react-native'
import firebase from '../../repositories/firebase'
import * as AppAuth from 'expo-app-auth'

type Result = {
  success?: boolean
  canceled?: boolean
  error?: any
}

//Lesson1: アプリにログインログアウトを実装してみよう
