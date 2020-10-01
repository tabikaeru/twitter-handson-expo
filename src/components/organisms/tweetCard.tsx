import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent } from 'react-native'
import { Tweet } from '../../entities/Tweet'
import { useUser } from '../../services/hooks/user'
import { fromNow } from '../../services/date'
import Avatar from '../../components/atoms/avatar'
import Spacer from '../../components/atoms/spacer'
import FileGallery from '../../components/moleculars/fileGallery'

type TweetCardProps = {
  tweet: Tweet
  onPressCard?: (event: GestureResponderEvent) => void
  onPressAvatar?: (event: GestureResponderEvent) => void
}

const TweetCard = ({ tweet, onPressCard, onPressAvatar }: TweetCardProps) => {
  const [user, loading] = useUser(tweet.writer.ref.id)

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
              <Text style={styles.nameText}>{loading ? '読み込み中' : user.name} </Text>
              <Text style={styles.idText}>
                @{tweet.writer.ref.id}
                {tweet.writer.ref.id}
              </Text>
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

export default TweetCard
