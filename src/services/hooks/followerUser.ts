import { useState, useCallback, useRef } from 'react'
import { CloneUser, buildCloneUser } from '../../entities/CloneUser'
import { getFollowerUsersRef } from '../../repositories/followerUser'

export const useFollowerUserPaginator = (
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

      const targetsRef = getFollowerUsersRef(uid)
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

      const targetsRef = getFollowerUsersRef(uid)
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
