import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import firebase from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import Spacer from '../components/atoms/spacer'
import Avatar from '../components/atoms/avatar'
import OutlinedButton from '../components/atoms/outlinedButton'

const coverImageURL =
  'https://image.shutterstock.com/z/stock-photo-friendly-romantic-encounter-boys-and-girls-autumn-day-in-the-old-town-363511535.jpg'

const UserScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  const [user, loading] = useUser(uid)

  const showThumbnailURL = useMemo(() => {
    if (user && user.thumbnailURL) {
      return user.thumbnailURL
    }

    return undefined
  }, [user])

  const onPressLogout = useCallback(() => {
    firebase.auth().signOut()
  }, [])

  const goToUpdateUser = useCallback(() => {
    navigation.navigate('UpdateUser')
  }, [navigation])

  return (
    <View style={styles.root}>
      <Image style={styles.coverImage} source={{ uri: coverImageURL }} />

      <View style={styles.headSection}>
        <View style={styles.thumbnailWrapper}>
          <Avatar size="l" uri={showThumbnailURL} />
        </View>
        <View style={styles.actionAreaWrapper}>
          <View style={styles.row}>
            <OutlinedButton text="変更" onPress={goToUpdateUser} />
            <Spacer layout="vertical" size="xs" />
            <OutlinedButton text="ログアウト" color="#FF3333" onPress={onPressLogout} />
          </View>
        </View>
      </View>

      <Spacer size="xxl" />

      <View style={styles.section}>
        <Text style={styles.nameText}>{loading ? '読み込み中' : user.name}</Text>
        <Spacer size="xxs" />
        <Text style={styles.idText}>@{uid}</Text>
      </View>

      <Spacer size="s" />

      <View style={styles.section}>
        <Text>{loading ? '読み込み中' : user.profile}</Text>
      </View>

      <Spacer size="s" />

      <View style={styles.section}>
        <View style={styles.row}>
          <Text>
            <Text style={styles.followCountText}>0</Text>
            <Text style={styles.followLabelText}>フォロー中</Text>
          </Text>
          <Spacer layout="vertical" size="s" />
          <Text>
            <Text style={styles.followCountText}>0</Text>
            <Text style={styles.followLabelText}>フォロワー</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  headSection: {
    width: '100%',
    position: 'relative',
  },
  section: {
    width: '100%',
    paddingHorizontal: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    position: 'absolute',
    top: -30,
    left: 24,
  },
  actionAreaWrapper: {
    position: 'absolute',
    top: 16,
    right: 24,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 12,
    color: 'gray',
  },
  followCountText: {
    fontSize: 12,
  },
  followLabelText: {
    fontSize: 12,
    color: 'gray',
  },
})

export default UserScreen
