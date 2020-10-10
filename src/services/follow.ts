import { firestore } from 'firebase'
import { db } from '../repositories/firebase'
import { getUserRef } from '../repositories/user'
import { getFollowUserRef } from '../repositories/followUser'
import { getFollowerUserRef } from '../repositories/followerUser'

export const follow = async (fromUID: string, toUID: string) => {
  try {
    const fromUserRef = getUserRef(fromUID)
    const toUserRef = getUserRef(toUID)
    const followUserRef = getFollowUserRef(fromUID, toUID)
    const followerUserRef = getFollowerUserRef(toUID, fromUID)

    const batch = db.batch()

    batch.set(followUserRef, {
      ref: toUserRef,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })

    batch.set(followerUserRef, {
      ref: fromUserRef,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })

    await batch.commit()
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false, error: e }
  }
}

export const unfollow = async (fromUID: string, toUID: string) => {
  try {
    const followUserRef = getFollowUserRef(fromUID, toUID)
    const followerUserRef = getFollowerUserRef(toUID, fromUID)

    const batch = db.batch()

    batch.delete(followUserRef)
    batch.delete(followerUserRef)

    await batch.commit()

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false, error: e }
  }
}
