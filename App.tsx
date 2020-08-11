import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { signout } from './src/repositories/firebase'
import { signInGoogle } from './src/services/auth/google'
import { useUser } from './src/hooks/user'
// import { createUserByHandler } from './src/services/user' //Sparkプランを使う人

type UsrComponentProps = {
  uid: string
}
const UserComponent = ({ uid }: UsrComponentProps) => {
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

export default function App() {
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

      {/*
        //Sparkプランを使う人
        uid && (
        <Button
          onPress={async () => {
            await createUserByHandler()
          }}
          title={'createUserByHandler'}
        ></Button>
      )
        */}

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
