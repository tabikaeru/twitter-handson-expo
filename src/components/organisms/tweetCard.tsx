import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../repositories/firebase'
import { useUser } from '../../services/hooks/user'
import { useTweet } from '../../services/hooks/tweet'
import { useLikeTweet } from '../../services/hooks/likeTweet'
import { like, unlike } from '../../services/like'
import { fromNow } from '../../services/date'
import Avatar from '../../components/atoms/avatar'
import CircleSkeleton from '../atoms/circleSkeleton'
import BoxSkeleton from '../atoms/boxSkeleton'
import Spacer from '../../components/atoms/spacer'
import FileGallery from '../../components/moleculars/fileGallery'
import TweetPreview from './tweetPreview'

const FULL_WIDTH = Dimensions.get('window').width

type HeartIconProps = {
  showLikeHeart: Animated.SharedValue<boolean>
  isLiked: boolean
  likeCount: number
}

const HeartIcon = ({ showLikeHeart, isLiked, likeCount }: HeartIconProps) => {
  const heartScale = useDerivedValue(() => (showLikeHeart.value ? 1 : 0))
  const heartoScale = useDerivedValue(() => (showLikeHeart.value ? 0.6 : 1))

  const heartStyle = useAnimatedStyle(() => {
    const springScale = withSpring(heartScale.value, {
      damping: 10,
      stiffness: 200,
    })
    const display = showLikeHeart.value ? 'flex' : 'none'
    return { display, transform: [{ scale: springScale }] }
  })

  const heartoStyle = useAnimatedStyle(() => {
    const springScale = withSpring(heartoScale.value, {
      damping: 10,
      stiffness: 200,
    })
    const display = showLikeHeart.value ? 'none' : 'flex'
    return { display, transform: [{ scale: springScale }] }
  })

  return (
    <React.Fragment>
      <Animated.View style={heartStyle}>
        <MaterialCommunityIcons name="heart" size={20} color="rgb(224, 36, 94)" />
      </Animated.View>
      <Animated.View style={heartoStyle}>
        <MaterialCommunityIcons name="heart-outline" size={20} color="gray" />
      </Animated.View>

      <Spacer layout="vertical" size="xxs" />
      {likeCount > 0 && <Text style={isLiked ? styles.likedCountText : styles.countText}>{likeCount}</Text>}
    </React.Fragment>
  )
}

type TweetCardProps = {
  tweetID: string
  writerUID: string
  onPressCard?: (event: GestureResponderEvent) => void
  onPressPreview?: (event: GestureResponderEvent) => void
  onPressAvatar?: (event: GestureResponderEvent) => void
  onPressRetweet?: (event: GestureResponderEvent) => void
}

const TweetCard = ({
  tweetID,
  writerUID,
  onPressCard,
  onPressPreview,
  onPressAvatar,
  onPressRetweet,
}: TweetCardProps) => {
  const [firebaseUser] = useAuthState(auth)
  const [user, userLoading] = useUser(writerUID)
  const [tweet, tweetLoading] = useTweet(writerUID, tweetID)
  const [likeTweet, likeTweetLoading] = useLikeTweet(firebaseUser.uid, tweetID)

  const preparedHeartAnimation = useRef<boolean>(false)
  const showLikeHeart = useSharedValue<boolean>(false)

  useEffect(() => {
    if (likeTweetLoading) return
    if (preparedHeartAnimation.current) return

    if (likeTweet) {
      showLikeHeart.value = true
      preparedHeartAnimation.current = true
    } else {
      showLikeHeart.value = false
      preparedHeartAnimation.current = true
    }
  }, [likeTweet, likeTweetLoading, showLikeHeart])

  const isLiked = useMemo(() => {
    return !!likeTweet
  }, [likeTweet])

  const onPressLike = useCallback(() => {
    if (likeTweetLoading) return

    if (isLiked) {
      showLikeHeart.value = false
      unlike(firebaseUser.uid, writerUID, tweetID)
    } else {
      showLikeHeart.value = true
      like(firebaseUser.uid, writerUID, tweetID)
    }
  }, [firebaseUser, isLiked, likeTweetLoading, showLikeHeart, tweetID, writerUID])

  // MEMO: スケルトンカードを表示
  if (userLoading || tweetLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.inner}>
          <TouchableOpacity onPress={onPressAvatar}>
            <View style={styles.avatarWrapper}>
              <CircleSkeleton size="m" />
            </View>
          </TouchableOpacity>
          <Spacer layout="vertical" size="s" />
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeaderWrapper}>
              <BoxSkeleton width={FULL_WIDTH - 100} height={20} />
            </View>
            <Spacer size="m" />
            <View>
              <BoxSkeleton width={FULL_WIDTH - 200} height={24} />
              <Spacer size="s" />
              <BoxSkeleton width={FULL_WIDTH - 100} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.root} onPress={onPressCard}>
      <View style={styles.inner}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Avatar size="m" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
        </View>
        <Spacer layout="vertical" size="s" />
        <View style={styles.contentWrapper}>
          <View style={styles.contentHeaderWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userText}>
              <Text style={styles.nameText}>{user.name} </Text>
              <Text style={styles.idText}>@{writerUID}</Text>
            </Text>
            <Spacer layout="vertical" size="s" />
            <Text style={styles.dateText}>{fromNow(tweet.createdAt)}</Text>
          </View>
          <Spacer size="xs" />
          <View>
            <Text style={styles.tweetText}>{tweet.text}</Text>
          </View>
          {tweet.fileURLs.length > 0 && (
            <React.Fragment>
              <Spacer size="s" />
              <FileGallery fileURLs={tweet.fileURLs} />
            </React.Fragment>
          )}
          {tweet.origin && (
            <React.Fragment>
              <Spacer size="s" />
              <TweetPreview
                tweetID={tweet.origin.ref.id}
                writerUID={tweet.origin.writer.ref.id}
                onPress={onPressPreview}
              />
              <Spacer size="s" />
            </React.Fragment>
          )}
          <View style={styles.actionsWrapper}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="chat-outline" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressRetweet}>
              <MaterialCommunityIcons name="twitter-retweet" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={onPressLike}>
              {!likeTweetLoading && (
                <HeartIcon showLikeHeart={showLikeHeart} isLiked={isLiked} likeCount={tweet.likeCount} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarWrapper: {},
  contentWrapper: {
    flex: 1,
  },
  contentHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingTop: 12,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userText: {
    flex: 1, // for ellipsizeMode
  },
  idText: {
    fontSize: 14,
    color: 'gray',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  tweetText: {
    fontSize: 16,
  },
  countText: {
    fontSize: 12,
    color: 'gray',
  },
  likedCountText: {
    fontSize: 12,
    color: 'rgb(224, 36, 94)',
  },
})

export default TweetCard
