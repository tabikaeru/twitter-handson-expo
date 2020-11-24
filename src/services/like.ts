import { getTweetRef, getTweet } from '../repositories/tweet'
import { createLikeTweet, deleteLikeTweet } from '../repositories/likeTweet'
import * as sharded from './extensions/counter'

export const like = async (fromUID: string, toUID: string, tweetID: string) => {
  try {
    const tweet = await getTweet(toUID, tweetID)

    if (!tweet) {
      throw new Error('not found tweet')
    }

    const tweetRef = getTweetRef(toUID, tweetID)

    await createLikeTweet(fromUID, tweetID, {
      ref: tweetRef,
      writer: tweet.writer,
      createdAt: tweet.createdAt,
      updatedAt: tweet.updatedAt,
    })

    const likeCount = new sharded.Counter(tweetRef, 'likeCount')
    await likeCount.incrementBy(1)

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false, error: e }
  }
}

export const unlike = async (fromUID: string, toUID: string, tweetID: string) => {
  try {
    const tweet = await getTweet(toUID, tweetID)

    if (!tweet) {
      throw new Error('not found tweet')
    }

    const tweetRef = getTweetRef(toUID, tweetID)

    await deleteLikeTweet(fromUID, tweetID)

    const likeCount = new sharded.Counter(tweetRef, 'likeCount')
    await likeCount.incrementBy(-1)

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false, error: e }
  }
}
