import React from 'react'
import { View, ViewProps } from 'react-native'

type SpaceSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

type SpacerProps = ViewProps & {
  layout?: 'horizontal' | 'vertical'
  size?: SpaceSize
}

const getSpaceSizeHandle = (size: SpaceSize) => {
  switch (size) {
    case 'xxs':
      return 3
    case 'xs':
      return 6
    case 's':
      return 12
    case 'm':
      return 24
    case 'l':
      return 36
    case 'xl':
      return 48
    case 'xxl':
      return 60
  }
}

const Spacer = ({ layout = 'horizontal', size = 'm', style, ...rest }: SpacerProps) => {
  return (
    <View
      style={[
        layout === 'horizontal'
          ? { paddingBottom: getSpaceSizeHandle(size) }
          : { paddingRight: getSpaceSizeHandle(size) },
        style,
      ]}
      {...rest}
    />
  )
}

export default Spacer
