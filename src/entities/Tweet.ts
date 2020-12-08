export type Tweet = {
  id: string
  text: string
  fileURLs: string[]
  writer: {
    ref: firebase.firestore.DocumentReference
  }
  origin: {
    ref: firebase.firestore.DocumentReference
    writer: {
      ref: firebase.firestore.DocumentReference
    }
  } | null
  likeCount: number
  createdAt: Date
  updatedAt: Date
}

export const buildTweet = (id: string, data: firebase.firestore.DocumentData) => {
  const newTweet: Tweet = {
    id,
    text: data.text,
    fileURLs: data.fileURLs,
    writer: data.writer,
    origin: data.origin,
    likeCount: data.likeCount,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }

  return newTweet
}

export type CreateTweet = {
  text: string
  fileBlobs?: Blob[]
  origin?: {
    ref: firebase.firestore.DocumentReference
    writer: {
      ref: firebase.firestore.DocumentReference
    }
  }
  writer: {
    ref: firebase.firestore.DocumentReference
  }
}
