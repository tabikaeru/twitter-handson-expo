import { db } from './firebase'

const usersRef = db.collection('users')

export const getFollowerUsersRef = (uid: string) => {
  const followerUsersRef = usersRef.doc(uid).collection('followerUsers')
  return followerUsersRef
}

export const getFollowerUserRef = (uid: string, followerUID: string) => {
  const followerUserRef = getFollowerUsersRef(uid).doc(followerUID)
  return followerUserRef
}
