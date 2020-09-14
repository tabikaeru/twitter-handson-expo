import React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import { Text, StyleSheet } from 'react-native'

type LoadingModalProps = {
  text?: string
  isVisible: boolean
}

const LoadingModal = ({ text, isVisible }: LoadingModalProps) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={styles.root}>
          <View style={styles.inner}>
            <ActivityIndicator size="large" />
            {text && <Text style={styles.text}>{text}</Text>}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const FULL_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: FULL_WIDTH * 0.7,
    height: FULL_WIDTH * 0.7,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
  },
})

export default LoadingModal
