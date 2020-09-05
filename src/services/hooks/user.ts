import { useState, useEffect } from 'react'
import { User, buildUser } from '../../entities/User'
import { db } from '../../repositories/firebase'

export const useUser = (uid: string): [User | null, boolean, firebase.firestore.FirestoreError | null] => {
  const [value, setValue] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)

  useEffect(() => {
    const targetRef = db.collection('users').doc(uid)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setValue(null)
          setLoading(false)
          return
        }

        const targetValue = buildUser(uid, snapshot.data())
        setValue(targetValue)
        setLoading(false)
      },
      error: (error) => {
        setError(error)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  return [value, loading, error]
}
