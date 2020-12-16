import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { useUser } from '../../services/hooks/user'
import { useTweet } from '../../services/hooks/tweet'
import { fromNow } from '../../services/date'
import Avatar from '../../components/atoms/avatar'
import CircleSkeleton from '../atoms/circleSkeleton'
import BoxSkeleton from '../atoms/boxSkeleton'
import Spacer from '../../components/atoms/spacer'
import Separator from '../../components/atoms/separator'
import FileGallery from '../../components/moleculars/fileGallery'
import TweetPreview from './tweetPreview'

const FULL_WIDTH = Dimensions.get('window').width

type TweetFromProps = {
  tweetID: string
  writerUID: string
  onPress?: (event: GestureResponderEvent) => void
}

const TweetFrom = ({ tweetID, writerUID, onPress }: TweetFromProps) => {
  const [user, userLoading] = useUser(writerUID)
  const [tweet, tweetLoading] = useTweet(writerUID, tweetID)

  // MEMO: スケルトンカードを表示
  if (userLoading || tweetLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.inner}>
          <TouchableOpacity>
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
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.inner}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity>
            <Avatar size="m" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
          <View style={styles.borderWrapper}>
            <Separator layout="vertical" width={2} />
          </View>
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
              <TweetPreview tweetID={tweet.origin.ref.id} writerUID={tweet.origin.writer.ref.id} />
              <Spacer size="s" />
            </React.Fragment>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  borderWrapper: {
    flex: 1,
    minHeight: 60,
    paddingTop: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  contentHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
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
})

export default TweetFrom
