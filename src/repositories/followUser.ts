import { db } from './firebase'

const usersRef = db.collection('users')

export const getFollowUsersRef = (uid: string) => {
  const followUsersRef = usersRef.doc(uid).collection('followUsers')
  return followUsersRef
}

export const getFollowUserRef = (uid: string, followUID: string) => {
  const followUserRef = getFollowUsersRef(uid).doc(followUID)
  return followUserRef
}
