import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import { useFollowTweetPaginator } from '../services/hooks/followTweet'
import Avatar from '../components/atoms/avatar'
import Tabs from '../components/atoms/tabs'
import Tab from '../components/atoms/tab'
import SearchBox from '../components/moleculars/searchBox'
import TweetList from '../components/organisms/tweetList'

const SearchScreen = () => {
  const navigation = useNavigation()
  const inset = useSafeAreaInsets()
  const [firebaseUser] = useAuthState(auth)
  const [user] = useUser(firebaseUser.uid)
  const [section, setSection] = useState<'popular' | 'trend' | 'news'>('popular')
  const [onFetch, { values, loading }] = useFollowTweetPaginator(firebaseUser.uid)

  useEffect(() => {
    onFetch({ initialize: true })
  }, [onFetch])

  const goToSearchTweet = useCallback(() => {
    navigation.dispatch(StackActions.push('SearchTweet'))
  }, [navigation])

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

  return (
    <View style={styles.root}>
      <View style={[styles.headerWrapper, { paddingTop: 9 + inset.top }]}>
        <View style={styles.headerAvatarWrapper}>
          <TouchableOpacity onPress={() => goToUser(firebaseUser.uid)}>
            <Avatar size="s" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.headerSearchWrapper} onPress={goToSearchTweet}>
          <SearchBox onFocus={goToSearchTweet} />
        </TouchableOpacity>
      </View>

      <Tabs>
        <Tab text="おすすめ" fontSize={16} active={section === 'popular'} onPress={() => setSection('popular')} />
        <Tab text="トレンド" fontSize={16} active={section === 'trend'} onPress={() => setSection('trend')} />
        <Tab text="ニュース" fontSize={16} active={section === 'news'} onPress={() => setSection('news')} />
      </Tabs>

      {/* MEMO: 本来は、"おすすめ","トレンド","ニュース"でコンテンツを切り替える */}
      <TweetList
        data={values.map((value) => ({ tweetID: value.id, writerUID: value.writer.ref.id }))}
        refreshing={loading}
        onRefresh={() => onFetch({ initialize: true })}
        onEndReached={() => onFetch({ initialize: false })}
        onPressCard={goToTweet}
        onPressAvatar={goToUser}
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

export default SearchScreen
