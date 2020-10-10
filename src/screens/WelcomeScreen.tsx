import React, { useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { signInGoogle } from '../services/auth/google'
import FilledButton from '../components/atoms/filledButton'
import Spacer from '../components/atoms/spacer'

const WelcomeScreen = () => {
  const onPressSignInGoogle = useCallback(async () => {
    const { error } = await signInGoogle()
    if (error) {
      return alert('ログインに失敗しました')
    }
  }, [])

  return (
    <View style={styles.root}>
      <Text style={styles.messageText}>「いま」起きていることを見つけよう。</Text>
      <Spacer size="xl" />
      <View style={styles.buttonWrapper}>
        <FilledButton text="Googleアカウントではじめる" fontSize={18} onPress={onPressSignInGoogle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 24,
  },
  buttonWrapper: {
    width: '100%',
  },
  messageText: {
    fontSize: 36,
    lineHeight: 36 * 1.4,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default WelcomeScreen
