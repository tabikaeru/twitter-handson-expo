import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import { useUser } from '../services/hooks/user'
import { useFollowUserPaginator } from '../services/hooks/followUser'
import { useFollowerUserPaginator } from '../services/hooks/followerUser'
import Tab from '../components/atoms/tab'
import Tabs from '../components/atoms/tabs'
import UserList from '../components/organisms/userList'

const FollowListScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialSection = (route.params as any).section
  const [onFetchFollowUser, { values: followUsers }] = useFollowUserPaginator(uid)
  const [onFetchFollowerUser, { values: followerUsers }] = useFollowerUserPaginator(uid)
  const [user] = useUser(uid)
  const [section, setSection] = useState<'follow' | 'follower'>(initialSection)

  const goToUser = useCallback(
    (uid) => {
      navigation.dispatch(StackActions.push('User', { uid }))
    },
    [navigation]
  )

  useEffect(() => {
    onFetchFollowUser({ initialize: true })
    onFetchFollowerUser({ initialize: true })
  }, [onFetchFollowUser, onFetchFollowerUser])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user ? user.name : '読み込み中',
    })
  }, [navigation, user])

  return (
    <View style={styles.root}>
      <Tabs>
        <Tab text="フォロー中" fontSize={16} active={section === 'follow'} onPress={() => setSection('follow')} />
        <Tab text="フォロワー" fontSize={16} active={section === 'follower'} onPress={() => setSection('follower')} />
      </Tabs>
      {section === 'follow' && (
        <UserList
          data={followUsers}
          onEndReached={() => onFetchFollowUser({ initialize: false })}
          onPressAvatar={goToUser}
        />
      )}
      {section === 'follower' && (
        <UserList
          data={followerUsers}
          onEndReached={() => onFetchFollowerUser({ initialize: false })}
          onPressAvatar={goToUser}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: 'rgb(230, 236, 240)',
  },
})

export default FollowListScreen
