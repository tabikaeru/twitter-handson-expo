import { useEffect, useState } from 'react'
import { db } from '../repositories/firebase'
import { InteractionManager } from 'react-native'
import { buildUser, User } from '../entities'
import { useDocument } from 'react-firebase-hooks/firestore'

const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>()
  const userRef = usersRef.doc(uid)
  //Lesson1: アプリにログインログアウトを実装してみよう

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      //Lesson1: アプリにログインログアウトを実装してみよう
      setUser(user)
    })
  }, [])

  return { user }
}
