import { db } from './firebase'

const usersRef = db.collection('users')

export const getFollowTweetsRef = (uid: string) => {
  const followTweetsRef = usersRef.doc(uid).collection('followTweets')
  return followTweetsRef
}
