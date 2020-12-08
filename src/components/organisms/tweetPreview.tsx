import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { useUser } from '../../services/hooks/user'
import { useTweet } from '../../services/hooks/tweet'
import { fromNow } from '../../services/date'
import Avatar from '../../components/atoms/avatar'
import CircleSkeleton from '../atoms/circleSkeleton'
import BoxSkeleton from '../atoms/boxSkeleton'
import Spacer from '../../components/atoms/spacer'
import FileGallery from '../../components/moleculars/fileGallery'

const FULL_WIDTH = Dimensions.get('window').width

type TweetPreviewProps = {
  tweetID: string
  writerUID: string
  onPress?: (event: GestureResponderEvent) => void
}

const TweetPreview = ({ tweetID, writerUID, onPress }: TweetPreviewProps) => {
  const [tweet, tweetLoading] = useTweet(writerUID, tweetID)
  const [user, userLoading] = useUser(writerUID)

  // MEMO: スケルトンカードを表示
  if (userLoading || tweetLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.inner}>
          <Spacer layout="vertical" size="s" />
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeaderWrapper}>
              <CircleSkeleton size="m" />
              <Spacer layout="vertical" size="s" />
              <BoxSkeleton width={FULL_WIDTH - 250} height={20} />
            </View>
            <Spacer size="m" />
            <View>
              <BoxSkeleton width={FULL_WIDTH - 200} height={24} />
              <Spacer size="s" />
              <BoxSkeleton width={FULL_WIDTH - 200} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.inner}>
        <View style={styles.contentWrapper}>
          <View style={styles.contentHeaderWrapper}>
            <Avatar size="s" uri={(user && user.thumbnailURL) ?? undefined} />
            <Spacer layout="vertical" size="s" />
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
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  contentHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

export default TweetPreview
