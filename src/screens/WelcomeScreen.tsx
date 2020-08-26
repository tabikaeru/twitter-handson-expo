import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { signInGoogle } from '../services/auth/google'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../repositories/firebase'

const WelcomeScreen = () => {
  const navigation = useNavigation()

  //Lesson1: アプリにログインログアウトを実装してみよう
  const onPressSignInGoogle = useCallback(async () => {}, [])

  //Lesson1: アプリにログインログアウトを実装してみよう
  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <View style={styles.actionArea}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Twitter hands on</Text>
        </View>
        <View style={styles.ButonContainer}>
          <TouchableOpacity style={styles.signinButton} onPress={onPressSignInGoogle}>
            <Image style={styles.googleIcon} resizeMode="contain" source={require('../../assets/google-logo.png')} />
            <Text style={styles.signinText}>Signin With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImageWrapper: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
  },

  titleWrapper: {
    padding: 24,
    height: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArea: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 96,
  },
  ButonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleButtonWrapper: {
    width: 112,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 20,
    paddingRight: 12,
  },
  googleButtonWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 20,
    paddingLeft: 12,
  },
  signinButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 320,
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  signinText: {
    color: '#404040',
    fontSize: 18,
  },
  googleIcon: {
    height: 30,
  },
  termTextWrapper: {
    paddingTop: 36,
  },
  termText: {
    width: 240,
    color: '#f8f8f8',
    fontSize: 10,
    fontWeight: '300',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default WelcomeScreen
