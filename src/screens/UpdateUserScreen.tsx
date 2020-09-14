import React, { useCallback, useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import { UpdateUser } from '../entities/User'
import { updateUser } from '../repositories/user'
import { pickImageFromDevice, convertURLToBlob } from '../services/image'
import { useUser } from '../services/hooks/user'
import Avatar from '../components/atoms/avatar'
import Separator from '../components/atoms/separator'
import Spacer from '../components/atoms/spacer'
import LoadingModal from '../components/moleculars/loadingModal'

const coverImageURL =
  'https://image.shutterstock.com/z/stock-photo-friendly-romantic-encounter-boys-and-girls-autumn-day-in-the-old-town-363511535.jpg'

const UpdateUserScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  const [user] = useUser(uid)
  const [newThumbnailURL, setNewThumbnailURL] = useState<string | null>(null)
  const [name, setName] = useState<string>('')
  const [profile, setProfile] = useState<string>('')
  const [fetching, setFetching] = useState<boolean>(false)

  const onPressAvatar = useCallback(async () => {
    const uri = await pickImageFromDevice()
    setNewThumbnailURL(uri)
  }, [])

  const save = useCallback(
    async (name: string, profile: string, thumbnailURL: string) => {
      if (!user) return
      try {
        setFetching(true)
        const thumbnailBlob = await convertURLToBlob(thumbnailURL)
        const data: UpdateUser = { name, profile, thumbnailBlob }
        await updateUser(uid, data)
        setFetching(false)
        navigation.goBack()
      } catch (e) {
        setFetching(false)
        Alert.alert('プロフィールの変更に失敗しました')
      }
    },
    [navigation, uid, user]
  )

  const showThumbnailURL = useMemo(() => {
    if (newThumbnailURL) {
      return newThumbnailURL
    }

    if (user && user.thumbnailURL) {
      return user.thumbnailURL
    }

    return undefined
  }, [newThumbnailURL, user])

  const renderHeaderRight = useCallback(() => {
    return (
      <View style={styles.headerRightButtonWrapper}>
        <TouchableOpacity onPress={() => save(name, profile, showThumbnailURL)}>
          <Text style={styles.headerRightButtonText}>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }, [name, profile, save, showThumbnailURL])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    })
  }, [navigation, renderHeaderRight])

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setProfile(user.profile)
  }, [user])

  return (
    <React.Fragment>
      <View style={styles.root}>
        <Image style={styles.coverImage} source={{ uri: coverImageURL }} />

        <View style={styles.headSection}>
          <View style={styles.thumbnailWrapper}>
            <Avatar size="l" uri={showThumbnailURL} />
          </View>
          <View style={styles.cameraIconWrapper}>
            <TouchableOpacity style={styles.cameraIconButton} onPress={onPressAvatar}>
              <AntDesign name="camerao" color="#f8f8f8" size={36} />
            </TouchableOpacity>
          </View>
        </View>

        <Spacer size="xxl" />
        <Separator />
        <Spacer size="s" />

        <View style={styles.section}>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>名前</Text>
          </View>
          <View style={styles.valueWrapper}>
            <TextInput
              style={styles.nameInput}
              defaultValue={user && user.name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

        <Spacer size="s" />
        <Separator />
        <Spacer size="s" />

        <View style={styles.section}>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>自己紹介</Text>
          </View>
          <View style={styles.valueWrapper}>
            <TextInput
              style={styles.profileInput}
              defaultValue={user && user.profile}
              onChangeText={(text) => setProfile(text)}
              multiline={true}
            />
          </View>
        </View>

        <Spacer size="s" />
        <Separator />
      </View>
      <LoadingModal isVisible={fetching} />
    </React.Fragment>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  thumbnailWrapper: {
    position: 'absolute',
    top: -30,
    left: 24,
  },
  cameraIconWrapper: {
    position: 'absolute',
    top: -30,
    left: 24,
  },
  headerRightButtonWrapper: {
    paddingRight: 24,
  },
  labelWrapper: {
    width: 80,
  },
  valueWrapper: {
    flex: 1,
  },
  cameraIconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  nameInput: {
    paddingVertical: 3,
    color: '#1da1f2',
    height: 24,
  },
  profileInput: {
    paddingVertical: 3,
    height: 60,
    color: '#1da1f2',
  },
  headerRightButtonText: {
    fontSize: 16,
    color: '#1da1f2',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 16,
    color: '#1da1f2',
  },
})

export default UpdateUserScreen
