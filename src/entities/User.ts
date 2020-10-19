export type User = {
  id: string
  name: string
  profile: string
  thumbnailURL: string | null
  followCount: number
  followerCount: number
  createdAt: Date
  updatedAt: Date
}

export const buildUser = (id: string, data: firebase.firestore.DocumentData) => {
  const newUser: User = {
    id,
    name: data.name,
    profile: data.profile,
    thumbnailURL: data.thumbnailURL,
    followCount: data.followCount,
    followerCount: data.followerCount,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }

  return newUser
}

export type UpdateUser = {
  name: string
  profile: string
  thumbnailBlob?: Blob
}
