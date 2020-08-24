import { useEffect, useState } from 'react'
import { db } from '../repositories/firebase'
import { InteractionManager } from 'react-native'
import { buildUser, User } from '../entities'
import { useDocument } from 'react-firebase-hooks/firestore'

const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>()
  const userRef = usersRef.doc(uid)
  const [value, loading, error] = useDocument(userRef)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (loading || !value || !value.data()) return
      const user = buildUser(value.id, value.data()!)
      setUser(user)
      if (error) {
        console.info('catch useUser error', error)
      }
    })
  }, [error, loading, value])

  return { user, loading }
}
