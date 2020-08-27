import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthState } from 'react-firebase-hooks/auth'
import TabNavigator from './tabNavigator'
import WelcomeScreen from '../screens/WelcomeScreen'
import firebase from '../repositories/firebase'

const Stack = createStackNavigator()

const AppNavigator = () => {
  //Lesson1: アプリにログインログアウトを実装してみよう
  const [user, initilalising, error] = useAuthState(firebase.auth())
  if (initilalising) {
    return (
      <View>
        <Text>initializing...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <Text>error</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }} headerMode="none">
      {
        //Lesson1: アプリにログインログアウトを実装してみよう
        user && user.uid && <Stack.Screen name="Main" component={TabNavigator} />
      }
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
})

export default AppNavigator
