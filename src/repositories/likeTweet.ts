import { CreateCloneTweet } from '../entities/CloneTweet'
import { db } from './firebase'

const usersRef = db.collection('users')

export const getLikeTweetsRef = (uid: string) => {
  const likeTweetsRef = usersRef.doc(uid).collection('likeTweets')
  return likeTweetsRef
}

export const getLikeTweetRef = (uid: string, tweetID: string) => {
  const likeTweetsRef = usersRef.doc(uid).collection('likeTweets').doc(tweetID)
  return likeTweetsRef
}

export const createLikeTweet = async (uid: string, tweetID: string, data: CreateCloneTweet) => {
  const likeTweetRef = getLikeTweetRef(uid, tweetID)
  await likeTweetRef.set(data)
  return { result: true }
}

export const deleteLikeTweet = async (uid: string, tweetID: string) => {
  const likeTweetRef = getLikeTweetRef(uid, tweetID)
  await likeTweetRef.delete()
  return { result: true }
}
