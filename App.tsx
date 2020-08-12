import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { signout } from './src/repositories/firebase'
import { signInGoogle } from './src/services/auth/google'
import { useUser } from './src/hooks/user'

type UserComponentProps = {
  uid: string
}

const UserComponent = ({ uid }: UserComponentProps) => {
  const { user, loading } = useUser(uid)
  return (
    <View>
      {loading && <Text>loading user data...</Text>}
      {user && (
        <View>
          <Text>uid: {user.uid}</Text>
          <Text>name: {user.name}</Text>
        </View>
      )}
    </View>
  )
}

const App = () => {
  const [authUser, initialising, error] = useAuthState(firebase.auth())
  const uid = useMemo(() => {
    if (!authUser || (authUser && !authUser.uid)) return null
    return authUser.uid
  }, [authUser])

  return (
    <View style={styles.container}>
      {initialising && <Text>initialising...</Text>}
      {error && <Text>error...</Text>}
      {uid && <UserComponent uid={uid} />}
      {!uid && <Button onPress={signInGoogle} title={'SingnIn Google'}></Button>}

      {uid && <Button onPress={signout} title={'SingnOut'}></Button>}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
