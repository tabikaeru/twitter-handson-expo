import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useUserAuthState, signout } from './src/repositories/firebase'
import { signInGoogle } from './src/services/auth/google'

export default function App() {
  const { uid, initialising, error } = useUserAuthState()

  return (
    <View style={styles.container}>
      {initialising && <Text>initialising...</Text>}
      {error && <Text>error...</Text>}
      {uid && <Text>uid is {uid}</Text>}
      {!uid && (
        <Button
          onPress={async () => {
            await signInGoogle()
          }}
          title={'SingnIn Google'}
        ></Button>
      )}
      {uid && (
        <Button
          onPress={async () => {
            await signout()
          }}
          title={'SingnOut'}
        ></Button>
      )}
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
