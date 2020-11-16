export type TweetRecord = {
  objectID: string
  id: string
  text: string
  writer: {
    id: string
  }
  updatedAtTimestamp: number
  createdAtTimestamp: number
}
