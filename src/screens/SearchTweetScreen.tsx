import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import { useSearchTweetPaginator } from '../services/hooks/tweet'
import Avatar from '../components/atoms/avatar'
import SearchBox from '../components/moleculars/searchBox'
import TweetList from '../components/organisms/tweetList'

const SearchTweetScreen = () => {
  const navigation = useNavigation()
  const inset = useSafeAreaInsets()
  const [firebaseUser] = useAuthState(auth)
  const [user] = useUser(firebaseUser.uid)
  const [text, setText] = useState<string>('')
  const [onFetch, { values, loading }] = useSearchTweetPaginator()

  const onSearch = useCallback(
    (text: string) => {
      onFetch({ text, initialize: true })
    },
    [onFetch]
  )

  const goToTweet = useCallback(
    (uid: string, tweetID: string) => {
      navigation.dispatch(StackActions.push('Tweet', { uid, tweetID }))
    },
    [navigation]
  )

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
      <View style={[styles.headerWrapper, { paddingTop: 9 + inset.top }]}>
        <View style={styles.headerAvatarWrapper}>
          <TouchableOpacity onPress={() => goToUser(firebaseUser.uid)}>
            <Avatar size="s" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerSearchWrapper}>
          <SearchBox autoFocus={true} value={text} onChangeText={setText} onSubmitEditing={() => onSearch(text)} />
        </View>
      </View>

      <TweetList
        data={values.map((value) => ({ tweetID: value.id, writerUID: value.writer.id }))}
        refreshing={loading}
        onRefresh={() => onFetch({ text, initialize: true })}
        onEndReached={() => onFetch({ initialize: false })}
        onPressCard={goToTweet}
        onPressAvatar={goToUser}
        onPressRetweet={goToCreateTweet}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  headerSearchWrapper: {
    flex: 1,
  },
  headerAvatarWrapper: {
    paddingRight: 12,
  },
})

export default SearchTweetScreen
