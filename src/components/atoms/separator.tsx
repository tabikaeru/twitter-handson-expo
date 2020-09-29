import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

type SeparatorProps = ViewProps & {
  color?: string // html color code
  width?: number
  layout?: 'horizontal' | 'vertical'
}

const Separator = ({
  color = '#D3D3D3',
  width = StyleSheet.hairlineWidth,
  layout = 'horizontal',
  style,
  ...rest
}: SeparatorProps) => {
  return (
    <View
      style={[
        layout === 'horizontal'
          ? { ...styles.horizontal, borderBottomColor: color, borderBottomWidth: width }
          : { ...styles.vertical, borderRightColor: color, borderRightWidth: width },
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
})

export default Separator
