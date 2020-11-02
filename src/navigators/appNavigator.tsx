import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import TabNavigator from './tabNavigator'
import WelcomeNavigator from './welcomeNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthErrorScreen from '../screens/AuthErrorScreen'
import { auth } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'

const CheckUserDataNavigator = ({ uid }: { uid: string }) => {
  const [user, loading, error] = useUser(uid)

  if (loading || (!loading && !user)) {
    return <AuthLoadingScreen />
  }

  if (error) {
    return <AuthErrorScreen />
  }

  return <TabNavigator />
}

const AppNavigator = () => {
  const [user, initializing, error] = useAuthState(auth)

  if (initializing) {
    return <AuthLoadingScreen />
  }

  if (error) {
    return <AuthErrorScreen />
  }

  if (user) {
    return <CheckUserDataNavigator uid={user.uid} />
  }

  return <WelcomeNavigator />
}

export default AppNavigator
