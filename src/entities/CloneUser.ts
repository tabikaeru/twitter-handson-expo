export type CloneUser = {
  id: string
  ref: firebase.firestore.DocumentReference
  createdAt: Date
  updatedAt: Date
}

export const buildCloneUser = (id: string, data: firebase.firestore.DocumentData) => {
  const newCloneUser: CloneUser = {
    id,
    ref: data.ref,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }

  return newCloneUser
}
