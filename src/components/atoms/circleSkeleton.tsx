import React from 'react'
import { View, ViewProps } from 'react-native'

type CircleSkeletonSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

type CircleSkeletonProps = ViewProps & {
  size?: CircleSkeletonSize
  skeletonColor?: string
}

const getCircleSkeletonSizeHandle = (size: CircleSkeletonSize) => {
  switch (size) {
    case 'xxs':
      return 12
    case 'xs':
      return 24
    case 's':
      return 30
    case 'm':
      return 40
    case 'l':
      return 80
    case 'xl':
      return 100
    case 'xxl':
      return 120
  }
}

const CircleSkeleton = ({ size = 'm', skeletonColor = '#DBE5ED', style, ...rest }: CircleSkeletonProps) => {
  return (
    <View
      style={[
        {
          width: getCircleSkeletonSizeHandle(size),
          height: getCircleSkeletonSizeHandle(size),
          borderRadius: getCircleSkeletonSizeHandle(size) / 2,
          backgroundColor: skeletonColor,
        },
        style,
      ]}
      {...rest}
    />
  )
}

export default CircleSkeleton
