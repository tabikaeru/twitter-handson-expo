import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

type TabsProps = ViewProps & {
  color?: string
}

const Tabs: React.FC<TabsProps> = ({ color = '#ffffff', style, children, ...rest }) => {
  return (
    <View style={[styles.root, { backgroundColor: color }, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default Tabs
