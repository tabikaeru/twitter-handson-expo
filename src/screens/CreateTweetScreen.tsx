import React, { useState, useCallback } from 'react'
import { ScrollView, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from 'react-native'
import { EvilIcons, AntDesign } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CreateTweet } from '../entities/Tweet'
import { auth } from '../repositories/firebase'
import { createTweet, getTweetRef } from '../repositories/tweet'
import { getUserRef } from '../repositories/user'
import { pickImageFromDevice, convertURLToBlob } from '../services/image'
import { useUser } from '../services/hooks/user'
import TextButton from '../components/atoms/textButton'
import FilledButton from '../components/atoms/filledButton'
import Fab from '../components/atoms/fab'
import Avatar from '../components/atoms/avatar'
import Separator from '../components/atoms/separator'
import Spacer from '../components/atoms/spacer'
import LoadingModal from '../components/moleculars/loadingModal'
import TweetPreview from '../components/organisms/tweetPreview'

const FULL_WIDTH = Dimensions.get('window').width

const CreateTweetScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()
  const [text, setText] = useState<string>('')
  const [fileURLs, setFileURLs] = useState<string[]>([])
  const [firebaseUser] = useAuthState(auth)
  const [user] = useUser(firebaseUser.uid)
  const [fetching, setFetching] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tweetID = (route.params as any)?.tweetID
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writerUID = (route.params as any)?.writerUID

  const onAddImage = useCallback(async () => {
    if (fileURLs.length > 3) {
      return Alert.alert('4枚までしか画像を添付できません')
    }
    const uri = await pickImageFromDevice()
    setFileURLs((prev) => [...prev, uri])
  }, [fileURLs.length])

  const onRemoveImage = useCallback(
    (index) => {
      if (index >= fileURLs.length) {
        return Alert.alert('画像削除に失敗しました')
      }
      setFileURLs((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    },
    [fileURLs.length]
  )

  const onTweet = useCallback(
    async (text: string, fileURLs: string[]) => {
      try {
        if (!user) return
        setFetching(true)
        const fileTask = fileURLs.map(async (fileURL) => {
          const blob = await convertURLToBlob(fileURL)
          return blob
        })
        const fileBlobs = await Promise.all(fileTask)
        const userRef = getUserRef(firebaseUser.uid)

        let origin = undefined
        if (tweetID && writerUID) {
          origin = {
            ref: getTweetRef(writerUID, tweetID),
            writer: {
              ref: getUserRef(writerUID),
            },
          }
        }

        const data: CreateTweet = {
          text,
          fileBlobs,
          origin,
          writer: {
            ref: userRef,
          },
        }

        await createTweet(firebaseUser.uid, data)
        setText('')
        setFetching(false)
        navigation.goBack()
      } catch (e) {
        console.warn(e)
        setFetching(false)
        Alert.alert('エラー', e)
      }
    },
    [firebaseUser.uid, navigation, tweetID, user, writerUID]
  )

  return (
    <React.Fragment>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.actionBar}>
          <TextButton text="キャンセル" fontSize={14} onPress={navigation.goBack} />
          <FilledButton text="ツイートする" fontSize={14} onPress={() => onTweet(text, fileURLs)} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            {user && <Avatar uri={user.thumbnailURL ?? undefined} />}
            <TextInput
              autoFocus={true}
              style={styles.input}
              multiline={true}
              placeholder="いまどうしてる？"
              value={text}
              onChangeText={setText}
            />
          </View>

          <Spacer size="l" />
          <View style={styles.files}>
            {fileURLs.map((fileURL, index) => (
              <React.Fragment key={index}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: fileURL }} style={styles.image} />
                  <View style={styles.removeImageIconWrapper}>
                    <Fab size="s" color="rgba(0, 0, 0, 0.8)" onPress={() => onRemoveImage(index)}>
                      <AntDesign name="close" size={24} color="#ffffff" />
                    </Fab>
                  </View>
                </View>
                <Spacer />
              </React.Fragment>
            ))}
          </View>
          {tweetID && writerUID && (
            <React.Fragment>
              <Spacer size="l" />
              <View style={styles.origin}>
                <TweetPreview tweetID={tweetID} writerUID={writerUID} />
              </View>
            </React.Fragment>
          )}
          <KeyboardSpacer />
        </ScrollView>
        <View style={styles.bottomActionBarWrapper}>
          <Separator />
          <View style={styles.bottomActionBar}>
            <TouchableOpacity onPress={onAddImage}>
              <EvilIcons name="image" size={36} color="#1da1f2" />
            </TouchableOpacity>
          </View>
          {/* MEMO: タブの高さ分スペースを引いている */}
          <KeyboardSpacer topSpacing={-80} />
        </View>
      </View>
      <LoadingModal isVisible={fetching} />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  bottomActionBarWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
  },
  imageWrapper: {
    position: 'relative',
  },
  removeImageIconWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  bottomActionBar: {
    width: FULL_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  files: {
    paddingHorizontal: 24,
  },
  origin: {
    paddingHorizontal: 24,
  },
  input: {
    fontSize: 18,
    padding: 12,
  },
  image: {
    width: FULL_WIDTH - 24 * 2,
    height: FULL_WIDTH - 24 * 2,
    borderRadius: 10,
  },
})

export default CreateTweetScreen
