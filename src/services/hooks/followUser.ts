import { useState, useEffect, useCallback, useRef } from 'react'
import { CloneUser, buildCloneUser } from '../../entities/CloneUser'
import { db } from '../../repositories/firebase'
import { getFollowUsersRef } from '../../repositories/followUser'
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

export const useFollowUserPaginator = (
  uid: string,
  per = 10
): [
  (option: { initialize: boolean }) => void,
  { values: CloneUser[]; loading: boolean; error: firebase.firestore.FirestoreError | null }
] => {
  const [values, setValues] = useState<CloneUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)
  const lastSnapshot = useRef<firebase.firestore.DocumentData | null>(null)
  const isFirstFetched = useRef<boolean>(false)
  const isProcessing = useRef<boolean>(false)

  const onInitialize = useCallback(async () => {
    try {
      if (isProcessing.current) return
      isProcessing.current = true
      setLoading(true)
      lastSnapshot.current = null

      const targetsRef = getFollowUsersRef(uid)
      const query = targetsRef.limit(per)
      const snapshot = await query.get()
      const targets = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

      if (snapshot.docs.length === per) {
        lastSnapshot.current = snapshot.docs[snapshot.docs.length - 1]
      } else {
        lastSnapshot.current = null
      }

      setValues(targets)
      setLoading(false)
      isFirstFetched.current = true
      isProcessing.current = false
    } catch (e) {
      setError(e)
      setLoading(false)
      isProcessing.current = false
    }
  }, [per, uid])

  const onNext = useCallback(async () => {
    try {
      if (isProcessing.current) return
      if (isFirstFetched.current && !lastSnapshot.current) return
      isProcessing.current = true

      const targetsRef = getFollowUsersRef(uid)
      const query = targetsRef.startAfter(lastSnapshot.current).limit(per)
      const snapshot = await query.get()
      const targets = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

      if (snapshot.docs.length === per) {
        lastSnapshot.current = snapshot.docs[snapshot.docs.length - 1]
      } else {
        lastSnapshot.current = null
      }

      setValues((prev) => [...prev, ...targets])
      isProcessing.current = false
    } catch (e) {
      setError(e)
      setLoading(false)
      isProcessing.current = false
    }
  }, [per, uid])

  const onFetch = useCallback(
    async ({ initialize }: { initialize: boolean }) => {
      if (initialize) {
        await onInitialize()
      } else {
        await onNext()
      }
    },
    [onInitialize, onNext]
  )

  return [onFetch, { values, loading, error }]
}
