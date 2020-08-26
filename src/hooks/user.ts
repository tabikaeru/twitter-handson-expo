import { useEffect, useState } from 'react'
import { db } from '../repositories/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'

type User = {
  uid: string
  name: string
}
const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>()
  const userRef = usersRef.doc(uid)
  //Lesson1: アプリにログインログアウトを実装してみよう

  useEffect(() => {
    //Lesson1: アプリにログインログアウトを実装してみよう
  }, [])

  return { user }
}
