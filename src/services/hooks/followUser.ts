import { useState, useEffect } from 'react'
import { CloneUser, buildCloneUser } from '../../entities/CloneUser'
import { db } from '../../repositories/firebase'
import { now } from '../date'

export const useFollowUser = (
  uid: string,
  followUID: string
): [CloneUser | null, boolean, firebase.firestore.FirestoreError | null] => {
  const [value, setValue] = useState<CloneUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)

  useEffect(() => {
    const targetRef = db.collection('users').doc(uid).collection('followUsers').doc(followUID)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setValue(null)
          setLoading(false)
          return
        }

        if (snapshot.metadata.hasPendingWrites) {
          return buildCloneUser(snapshot.id, { ...snapshot.data(), createdAt: now(), updatedAt: now() })
        }

        const targetValue = buildCloneUser(uid, snapshot.data())
        setValue(targetValue)
        setLoading(false)
      },
      error: (error) => {
        console.warn(error)
        setError(error)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [followUID, uid])

  return [value, loading, error]
}
