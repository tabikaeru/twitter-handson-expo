import React from 'react'
import { TouchableOpacityProps, TouchableOpacity, StyleSheet, Text } from 'react-native'

type TabProps = TouchableOpacityProps & {
  text?: string
  focusColor?: string
  fontSize?: number
  color?: string // html color code
  active?: boolean
}

const Tab: React.FC<TabProps> = ({
  color = 'gray',
  focusColor = '#1da1f2',
  fontSize = 12,
  active = false,
  text,
  style,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        { borderBottomWidth: active ? 2 : 0, borderBottomColor: focusColor, borderStyle: 'solid' },
        style,
      ]}
      {...rest}
    >
      {text && <Text style={[styles.tabText, { color: active ? focusColor : color, fontSize }]}>{text}</Text>}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontWeight: 'bold',
  },
})

export default Tab
