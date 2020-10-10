import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native'

type FilledButtonProps = TouchableOpacityProps & {
  text?: string
  fontSize?: number
  textColor?: string // html color code
  color?: string // html color code
}

const FilledButton: React.FC<FilledButtonProps> = ({
  text,
  fontSize = 12,
  color = '#1da1f2',
  textColor = '#ffffff',
  style,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.root, { backgroundColor: color }, style]} {...rest}>
      {text && <Text style={{ color: textColor, fontSize }}>{text}</Text>}
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
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
})

export default FilledButton
