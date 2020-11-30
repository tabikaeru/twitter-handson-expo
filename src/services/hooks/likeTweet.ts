import { useState, useEffect } from 'react'
import { CloneTweet, buildCloneTweet } from '../../entities/CloneTweet'
import { db } from '../../repositories/firebase'
import { now } from '../date'

export const useLikeTweet = (
  uid: string,
  tweetID: string
): [CloneTweet | null, boolean, firebase.firestore.FirestoreError | null] => {
  const [value, setValue] = useState<CloneTweet | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)

  useEffect(() => {
    const targetRef = db.collection('users').doc(uid).collection('likeTweets').doc(tweetID)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setValue(null)
          setLoading(false)
          return
        }

        if (snapshot.metadata.hasPendingWrites) {
          const targetValue = buildCloneTweet(snapshot.id, { ...snapshot.data(), createdAt: now(), updatedAt: now() })
          setValue(targetValue)
          setLoading(false)
        }

        const targetValue = buildCloneTweet(uid, snapshot.data())
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
  }, [tweetID, uid])

  return [value, loading, error]
}
