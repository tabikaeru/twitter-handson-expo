import React, { useCallback, useLayoutEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MaterialIcons } from '@expo/vector-icons'
import { auth } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import { useTweets } from '../services/hooks/tweet'
import Fab from '../components/atoms/fab'
import Avatar from '../components/atoms/avatar'
import Separator from '../components/atoms/separator'
import TweetCard from '../components/organisms/tweetCard'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [firebaseUser] = useAuthState(auth)
  const [user] = useUser(firebaseUser.uid)
  const [tweets] = useTweets()

  const goToTweet = useCallback(
    (uid: string, tweetID: string) => {
      navigation.navigate('Tweet', { uid, tweetID })
    },
    [navigation]
  )

  const goToCreateTweet = useCallback(() => {
    navigation.navigate('CreateTweet')
  }, [navigation])

  const goToUser = useCallback(
    (uid) => {
      navigation.navigate('User', { uid })
    },
    [navigation]
  )

  const renderHeaderLeft = useCallback(() => {
    return (
      <View style={styles.headerLeftWrapper}>
        <TouchableOpacity onPress={() => goToUser(firebaseUser.uid)}>
          <Avatar size="s" uri={(user && user.thumbnailURL) ?? undefined} />
        </TouchableOpacity>
      </View>
    )
  }, [firebaseUser, goToUser, user])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    })
  }, [navigation, renderHeaderLeft])

  return (
    <View style={styles.root}>
      <ScrollView>
        {tweets.map((tweet) => (
          <React.Fragment key={tweet.id}>
            <TweetCard
              tweet={tweet}
              onPressCard={() => goToTweet(tweet.writer.ref.id, tweet.id)}
              onPressAvatar={() => goToUser(tweet.writer.ref.id)}
            />
            <Separator />
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={styles.fabWrapper}>
        <Fab onPress={goToCreateTweet}>
          <MaterialIcons name="edit" size={24} color="#ffffff" />
        </Fab>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
  headerLeftWrapper: {
    paddingLeft: 24,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
})

export default HomeScreen
