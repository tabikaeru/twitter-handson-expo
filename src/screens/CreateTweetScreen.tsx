import React, { useState, useCallback } from 'react'
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CreateTweet } from '../entities/Tweet'
import firebase from '../repositories/firebase'
import { createTweet } from '../repositories/tweet'
import { getUserRef } from '../repositories/user'
import { useUser } from '../services/hooks/user'
import TextButton from '../components/atoms/textButton'
import FilledButton from '../components/atoms/filledButton'
import Avatar from '../components/atoms/avatar'

const CreateTweetScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [text, setText] = useState<string>('')
  const [firebaseUser] = useAuthState(firebase.auth())
  const [user, loading] = useUser(firebaseUser.uid)

  const onTweet = useCallback(
    async (text: string) => {
      try {
        if (!user) return
        const userRef = getUserRef(firebaseUser.uid)
        const data: CreateTweet = {
          text,
          writer: {
            ref: userRef,
          },
        }
        await createTweet(firebaseUser.uid, data)
        setText('')
        navigation.goBack()
      } catch (e) {
        console.warn(e)
        Alert.alert('エラー', e)
      }
    },
    [firebaseUser.uid, navigation, user]
  )

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.actionBar}>
        <TextButton text="キャンセル" fontSize={14} onPress={navigation.goBack} />
        <FilledButton text="ツイートする" fontSize={14} onPress={() => onTweet(text)} />
      </View>
      <View style={styles.content}>
        <Avatar uri={!loading && user && user.thumbnailURL ? user.thumbnailURL : undefined} />
        <TextInput
          autoFocus={true}
          style={styles.input}
          multiline={true}
          placeholder="いまどうしてる？"
          value={text}
          onChangeText={setText}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  input: {
    fontSize: 18,
    height: 400,
    padding: 12,
  },
})

export default CreateTweetScreen
