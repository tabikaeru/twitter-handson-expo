import { useState, useEffect, useRef, useCallback } from 'react'
import { Tweet, buildTweet } from '../../entities/Tweet'
import { db } from '../../repositories/firebase'
import { now } from '../date'

export const useTweets = (): [Tweet[], boolean, Error | null] => {
  const [values, setValues] = useState<Tweet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetsRef = db.collectionGroup('tweets').orderBy('createdAt', 'desc')
    const unsubscribe = targetsRef.onSnapshot({
      next: (snapshot) => {
        const targetValues = snapshot.docs.map((doc) => {
          if (doc.metadata.hasPendingWrites) {
            return buildTweet(doc.id, { ...doc.data(), createdAt: now(), updatedAt: now() })
          }
          return buildTweet(doc.id, doc.data())
        })
        setValues(targetValues)
        setLoading(false)
      },
      error: (error) => {
        setError(error)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return [values, loading, error]
}

export const useTweet = (
  uid: string,
  tweetID: string
): [Tweet | null, boolean, firebase.firestore.FirestoreError | null] => {
  const [value, setValue] = useState<Tweet | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)

  useEffect(() => {
    const targetRef = db.collection('users').doc(uid).collection('tweets').doc(tweetID)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setValue(null)
          setLoading(false)
          return
        }

        const targetValue = buildTweet(uid, snapshot.data())
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
