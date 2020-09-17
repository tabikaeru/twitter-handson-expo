import * as ImagePicker from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import * as ImageManipulator from 'expo-image-manipulator'
import { Image } from 'react-native'

// MEMO: Image.getSizeをasync-awaitで使えるようラップしている。
const _getSize = (url: string) => {
  return new Promise<{ width?: number; height?: number; error?: Error }>((resolve) => {
    Image.getSize(
      url,
      (width, height) => resolve({ width, height }),
      (error) => resolve({ error })
    )
  })
}

const _gcd: (x: number, y: number) => number = (x, y) => {
  const rx = Math.round(x)
  const ry = Math.round(y)

  if (ry === 0) return rx
  return _gcd(ry, rx % ry)
}

export const getSizeAsync = async (url: string) => {
  const { width, height, error } = await _getSize(url)

  if (error) {
    return { error }
  }

  return { width, height }
}

export const getAspectAsync = async (url: string) => {
  const { width, height, error } = await _getSize(url)

  if (error) {
    return { error }
  }

  const num = _gcd(width, height)

  return { aspect: [width / num, height / num] }
}

const manipulateImage = async (uri: string, maxWidth: number) => {
  const { width, height, error } = await getSizeAsync(uri)

  if (error) {
    return
  }

  if (width <= maxWidth) {
    return uri
  }

  const resizeWidth = maxWidth
  const resizeHeight = (height * resizeWidth) / maxWidth
  const resizeResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: resizeWidth, height: resizeHeight } }],
    {
      base64: false,
      compress: 1,
      format: ImageManipulator.SaveFormat.PNG,
    }
  )

  return resizeResult.uri
}

export const pickImageFromDevice = async () => {
  const pickResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
  })

  if (pickResult.cancelled) {
    return
  }

  const { uri } = (pickResult as unknown) as ImagePicker.ImagePickerResult & ImageInfo // uriを読み込もうとすると型エラーが起きるので型再定義

  const resizeURI = manipulateImage(uri, 1080)

  return resizeURI
}

export const convertURLToBlob = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
}
