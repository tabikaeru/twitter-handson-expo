export type User = {
  id: string
  enabled: boolean
  uid: string
  name: string
  thumbnailURL: string | null
}

export const buildUser = (id: string, data: firebase.firestore.DocumentData) => {
  const newUser: User = {
    id,
    enabled: data.enabled,
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
  }

  return newUser
}

export const initialUser = ({ uid, name }: { uid: string; name: string }) => {
  const user: CreateUser = {
    enabled: true,
    uid,
    name,
    thumbnailURL: null,
  }

  return user
}

export const ANONYMOUS_USERNAME = 'anonymous'

export type CreateUser = Omit<User, 'id'>
