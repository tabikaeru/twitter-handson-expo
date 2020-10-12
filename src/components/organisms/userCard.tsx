import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent } from 'react-native'
import { User } from '../../entities/User'
import Avatar from '../atoms/avatar'
import Spacer from '../atoms/spacer'

type UserCardProps = {
  user: User
  onPressCard?: (event: GestureResponderEvent) => void
  onPressAvatar?: (event: GestureResponderEvent) => void
}

const UserCard = ({ user, onPressAvatar }: UserCardProps) => {
  return (
    <TouchableOpacity style={styles.root}>
      <View style={styles.inner}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Avatar size="m" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
        </View>

        <Spacer layout="vertical" size="s" />

        <View style={styles.contentWrapper}>
          <View style={styles.contentHeaderWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userText}>
              <Text style={styles.nameText}>{user.name}</Text>
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userText}>
              <Text style={styles.idText}>@{user.id}</Text>
            </Text>
          </View>
          <Spacer size="xs" />
          <View>
            <Text style={styles.profileText}>{user.profile}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarWrapper: {},
  contentWrapper: {
    flex: 1,
  },
  contentHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userText: {
    flex: 1, // for ellipsizeMode
  },
  idText: {
    fontSize: 14,
    color: 'gray',
  },
  profileText: {
    fontSize: 16,
  },
})

export default UserCard
