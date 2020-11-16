import { useState, useEffect, useRef, useCallback } from 'react'
import { Tweet, buildTweet } from '../../entities/Tweet'
import { TweetRecord } from '../../entities/TweetRecord'
import { db } from '../../repositories/firebase'
import { getTweetsIndex } from '../../repositories/algolia'
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

export const useSearchTweetPaginator = (
  per = 10
): [
  (option: { text?: string; initialize: boolean }) => void,
  { values: TweetRecord[]; loading: boolean; error: firebase.firestore.FirestoreError | null }
] => {
  const [values, setValues] = useState<TweetRecord[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)
  const query = useRef<string>(null)
  const page = useRef<number>(null)
  const isFirstFetched = useRef<boolean>(false)
  const isProcessing = useRef<boolean>(false)

  const onInitialize = useCallback(
    async (text: string) => {
      try {
        if (isProcessing.current) return
        const tweetsIndex = getTweetsIndex()
        isProcessing.current = true
        setLoading(true)
        page.current = 0
        query.current = text

        const { hits } = await tweetsIndex.search<TweetRecord>(text, {
          page: page.current,
          hitsPerPage: per,
        })

        if (hits.length === per) {
          page.current++
        } else {
          page.current = null
        }

        setValues(hits)
        setLoading(false)
        isFirstFetched.current = true
        isProcessing.current = false
      } catch (e) {
        console.warn(e)
        setError(e)
        setLoading(false)
        isProcessing.current = false
      }
    },
    [per]
  )

  const onNext = useCallback(async () => {
    try {
      if (isProcessing.current) return
      if (isFirstFetched.current && !page.current && !query.current) return
      const tweetsIndex = getTweetsIndex()
      isProcessing.current = true

      const { hits } = await tweetsIndex.search<TweetRecord>(query.current, {
        page: page.current,
        hitsPerPage: per,
      })

      if (hits.length === per) {
        page.current++
      } else {
        page.current = null
      }

      setValues((prev) => [...prev, ...hits])
      isProcessing.current = false
    } catch (e) {
      setError(e)
      setLoading(false)
      isProcessing.current = false
    }
  }, [per])

  const onFetch = useCallback(
    async ({ text, initialize }: { text?: string; initialize: boolean }) => {
      if (initialize) {
        await onInitialize(text)
      } else {
        await onNext()
      }
    },
    [onInitialize, onNext]
  )

  return [onFetch, { values, loading, error }]
}
