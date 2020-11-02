import React from 'react'
import { View, ViewProps } from 'react-native'

type BoxSkeletonProps = ViewProps & {
  width?: number
  height?: number
  skeletonColor?: string
}

const BoxSkeleton = ({ width = 300, height = 60, skeletonColor = '#DBE5ED', style, ...rest }: BoxSkeletonProps) => {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: 6,
          backgroundColor: skeletonColor,
        },
        style,
      ]}
      {...rest}
    />
  )
}

export default BoxSkeleton
