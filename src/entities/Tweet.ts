export type Tweet = {
  id: string
  text: string
  fileURLs: string[]
  writer: {
    user: firebase.firestore.DocumentReference
  }
}

export const buildTweet = (id: string, data: firebase.firestore.DocumentData) => {
  const newTweet: Tweet = {
    id,
    text: data.text,
    fileURLs: data.fileURLs,
    writer: data.writer,
  }

  return newTweet
}

export type CreateTweet = {
  text: string
  fileBlobs?: Blob[]
  writer: {
    ref: firebase.firestore.DocumentReference
  }
}
