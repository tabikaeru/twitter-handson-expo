import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Spacer from '../components/atoms/spacer'

const AuthErrorScreen = () => {
  return (
    <View style={styles.root}>
      <AntDesign name="twitter" size={48} color="#1da1f2" />
      <Spacer size="l" />
      <Text style={styles.messageText}>問題が発生しました</Text>
      <Spacer size="s" />
      <Text style={styles.messageText}>アプリを再起動してください</Text>
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
  },
  messageText: {
    fontSize: 16,
  },
})

export default AuthErrorScreen
