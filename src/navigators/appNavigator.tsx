import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthState } from 'react-firebase-hooks/auth'
import TabNavigator from './tabNavigator'
import WelcomeNavigator from './welcomeNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthErrorScreen from '../screens/AuthErrorScreen'
import { auth } from '../repositories/firebase'

const Stack = createStackNavigator()

const AppNavigator = () => {
  const [user, initializing, error] = useAuthState(auth)

  if (initializing) {
    return <AuthLoadingScreen />
  }

  if (error) {
    return <AuthErrorScreen />
  }

  if (user) {
    return <TabNavigator />
  }

  return <WelcomeNavigator />
}

export default AppNavigator
