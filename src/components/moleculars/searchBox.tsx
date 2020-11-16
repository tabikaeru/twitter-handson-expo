import React from 'react'
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type SearchBoxProps = TextInputProps

const SearchBox = ({ value, placeholder = 'キーワード検索', onChangeText, ...rest }: SearchBoxProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name="search" size={20} color="#6B7B8A" />
      </View>
      <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E6ECF0',
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  iconWrapper: {
    paddingRight: 9,
  },
  input: {
    color: '#6B7B8A',
  },
})

export default SearchBox
