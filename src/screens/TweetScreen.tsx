import React, { useCallback } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import Separator from '../components/atoms/separator'
import TweetCard from '../components/organisms/tweetCard'

const TweetScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tweetID = (route.params as any).tweetID

  const goToUser = useCallback(
    (uid) => {
      navigation.dispatch(StackActions.push('User', { uid }))
    },
    [navigation]
  )

  const goToCreateTweet = useCallback(
    (writerUID: string, tweetID: string) => {
      navigation.dispatch(StackActions.push('CreateTweet', { tweetID, writerUID }))
    },
    [navigation]
  )

  return (
    <View style={styles.root}>
      <ScrollView>
        <TweetCard
          tweetID={tweetID}
          writerUID={uid}
          onPressAvatar={() => goToUser(uid)}
          onPressRetweet={() => goToCreateTweet(uid, tweetID)}
        />
        <Separator />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
})

export default TweetScreen
