import firebase, { db, storage } from './firebase'
import { UpdateUser } from '../entities/user'
import { firestore } from 'firebase'

const usersFirestoreRef = db.collection('users')
const usersStorageRef = storage.ref('users')

const setThumbnail = async (uid: string, blob: Blob): Promise<string | null> => {
  const userStorageRef = usersStorageRef.child(uid)
  const task = userStorageRef.child('thumbnail.png').put(blob, { contentType: 'image/png' })

  return task
    .then((snapshop) => snapshop.ref.getDownloadURL())
    .then((url: string) => {
      return url
    })
    .catch((e) => {
      console.warn(e)
      return null
    })
}

export const getUserRef = (uid: string) => {
  const userRef = usersFirestoreRef.doc(uid)
  return userRef
}

export const updateUser = async (uid: string, data: UpdateUser) => {
  const userFirestoreRef = usersFirestoreRef.doc(uid)

  let thumbnailURL = null
  if (data.thumbnailBlob) {
    thumbnailURL = await setThumbnail(uid, data.thumbnailBlob)
  }

  await userFirestoreRef.update({
    name: data.name,
    profile: data.profile,
    thumbnailURL,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  })

  return { result: true }
}
