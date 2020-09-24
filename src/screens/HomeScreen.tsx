import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'
import Fab from '../components/atoms/fab'

const HomeScreen = () => {
  const navigation = useNavigation()

  const goToCreateTweet = useCallback(() => {
    navigation.navigate('CreateTweet')
  }, [navigation])

  return (
    <View style={styles.root}>
      <View style={styles.fabWrapper}>
        <Fab onPress={goToCreateTweet}>
          <MaterialIcons name="edit" size={24} color="#ffffff" />
        </Fab>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
})

export default HomeScreen
