import { firestore } from 'firebase'
import { db, storage } from './firebase'
import { buildTweet, CreateTweet } from '../entities/Tweet'

const usersFirestoreRef = db.collection('users')
const usersStorageRef = storage.ref('users')

const setTweetImage = async (uid: string, tweetID: string, fileName: string, blob: Blob) => {
  const userStorageRef = usersStorageRef.child(uid)
  const task = userStorageRef.child(`tweets/${tweetID}/${fileName}.png`).put(blob, { contentType: 'image/png' })

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

export const getTweetsRef = (uid: string) => {
  const tweetsRef = usersFirestoreRef.doc(uid).collection('tweets')
  return tweetsRef
}

export const getTweetRef = (uid: string, tweetID: string) => {
  const tweetRef = usersFirestoreRef.doc(uid).collection('tweets').doc(tweetID)
  return tweetRef
}

export const getTweet = async (uid: string, tweetID: string) => {
  const tweetRef = getTweetRef(uid, tweetID)
  const snapshot = await tweetRef.get()
  if (!snapshot.exists) {
    return null
  }
  const tweet = buildTweet(snapshot.id, snapshot.data())
  return tweet
}

export const createTweet = async (uid: string, data: CreateTweet) => {
  const tweetsRef = getTweetsRef(uid)
  const tweetRef = tweetsRef.doc()

  const fileURLs = []
  if (data.fileBlobs) {
    const storageTask = data.fileBlobs.map(async (blob, index) => {
      const fileURL = await setTweetImage(uid, tweetRef.id, `image${index + 1}`, blob)
      fileURLs.push(fileURL)
    })

    await Promise.all(storageTask)
  }

  await tweetRef.set({
    text: data.text,
    fileURLs,
    writer: data.writer,
    origin: data.origin ?? null,
    likeCount: 0,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  })
  return { result: true }
}
