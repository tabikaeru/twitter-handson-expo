import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const AuthLoadingScreen = () => {
  return (
    <View style={styles.root}>
      <AntDesign name="twitter" size={60} color="#ffffff" />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1da1f2',
  },
})

export default AuthLoadingScreen
