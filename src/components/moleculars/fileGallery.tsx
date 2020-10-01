import React from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Separator from '../atoms/separator'

type FileGalleryProps = {
  fileURLs: string[]
}

const FileGallery = ({ fileURLs }: FileGalleryProps) => {
  if (fileURLs.length === 1) {
    return (
      <View style={styles.root}>
        {fileURLs.map((url, index) => (
          <View key={index} style={styles.flex}>
            <Image source={{ uri: url }} style={styles.flexImage} />
          </View>
        ))}
      </View>
    )
  }

  if (fileURLs.length === 2) {
    return (
      <View style={styles.root}>
        {fileURLs.map((url, index) => (
          <React.Fragment key={index}>
            <View style={styles.flex}>
              <Image source={{ uri: url }} style={styles.flexImage} />
            </View>
            {index === 0 && <Separator color="#ffffff" width={2} layout="vertical" />}
          </React.Fragment>
        ))}
      </View>
    )
  }

  if (fileURLs.length === 3) {
    return (
      <View style={styles.root}>
        <View style={styles.flex}>
          <Image source={{ uri: fileURLs[0] }} style={styles.flexImage} />
        </View>
        <Separator color="#ffffff" width={2} layout="vertical" />
        <View style={styles.flex}>
          {fileURLs.slice(1).map((url, index) => (
            <React.Fragment key={index}>
              <View style={styles.flex}>
                <Image source={{ uri: url }} style={styles.flexImage} />
              </View>
              {index === 0 && <Separator color="#ffffff" width={2} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <View style={styles.flex}>
        {fileURLs.slice(0, 2).map((url, index) => (
          <React.Fragment key={index}>
            <View style={styles.flex}>
              <Image source={{ uri: url }} style={styles.flexImage} />
            </View>
            {index === 0 && <Separator color="#ffffff" width={2} />}
          </React.Fragment>
        ))}
      </View>
      <Separator color="#ffffff" width={2} layout="vertical" />
      <View style={styles.flex}>
        {fileURLs.slice(2, 4).map((url, index) => (
          <React.Fragment key={index}>
            <View style={styles.flex}>
              <Image source={{ uri: url }} style={styles.flexImage} />
            </View>
            {index === 0 && <Separator color="#ffffff" width={2} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
    height: 180,
  },
  flexImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
})

export default FileGallery
