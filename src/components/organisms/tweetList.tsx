import React from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { CloneTweet } from '../../entities/CloneTweet'
import Separator from '../../components/atoms/separator'
import TweetCard from './tweetCard'

// TweetListItem
// -------------------------
type TweetListItemProps = {
  tweetID: string
  writerUID: string
  onPressCard?: (uid: string, tweetID: string) => void
  onPressAvatar?: (uid: string) => void
}

const TweetListItem = ({ tweetID, writerUID, onPressCard, onPressAvatar }: TweetListItemProps) => {
  return (
    <TweetCard
      tweetID={tweetID}
      writerUID={writerUID}
      onPressCard={() => onPressCard(writerUID, tweetID)}
      onPressAvatar={() => onPressAvatar(writerUID)}
    />
  )
}

// ListEmptyComponent
// -------------------------
const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>ツイートが見つかりません</Text>
    </View>
  )
}

// UserList
// -------------------------
type TweetListProps = {
  data: CloneTweet[]
  refreshing: boolean
  onRefresh: () => void
  onEndReached: () => void
  onPressCard?: (uid: string, tweetID: string) => void
  onPressAvatar?: (uid: string) => void
}

const TweetList = ({ data, refreshing, onRefresh, onEndReached, onPressCard, onPressAvatar }: TweetListProps) => {
  return (
    <FlatList
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => (
        <TweetListItem
          tweetID={item.id}
          writerUID={item.writer.ref.id}
          onPressCard={onPressCard}
          onPressAvatar={onPressAvatar}
        />
      )}
      ListEmptyComponent={<ListEmptyComponent />}
    />
  )
}

const styles = StyleSheet.create({
  emptyWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
  },
})

export default TweetList
