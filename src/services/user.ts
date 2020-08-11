import { functions } from '../repositories/firebase'

//Sparkプランを使う人
export const createUserByHandler = async () => {
  try {
    await functions.httpsCallable('createUserByHandler')({})
  } catch (e) {
    console.warn(e)
  }
}
