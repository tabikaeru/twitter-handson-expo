export type CloneTweet = {
  id: string
  ref: firebase.firestore.DocumentReference
  writer: { ref: firebase.firestore.DocumentReference }
  createdAt: Date
  updatedAt: Date
}

export type CreateCloneTweet = Omit<CloneTweet, 'id'>

export const buildCloneTweet = (id: string, data: firebase.firestore.DocumentData) => {
  const newCloneTweet: CloneTweet = {
    id,
    ref: data.ref,
    writer: data.writer,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }

  return newCloneTweet
}
