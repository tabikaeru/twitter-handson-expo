import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native'

type TextButtonProps = TouchableOpacityProps & {
  text?: string
  fontSize?: number
  color?: string // html color code
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  fontSize = 12,
  color = '#1da1f2',
  style,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.root, style]} {...rest}>
      {text && <Text style={{ color, fontSize }}>{text}</Text>}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
})

export default TextButton
