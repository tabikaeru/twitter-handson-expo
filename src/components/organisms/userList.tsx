import React from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { CloneUser } from '../../entities/CloneUser'
import { useUser } from '../../services/hooks/user'
import UserCard from './userCard'

// UserListItem
// -------------------------
type UserListItemProps = {
  uid: string
  onPressAvatar?: (uid: string) => void
}

const UserListItem = ({ uid, onPressAvatar }: UserListItemProps) => {
  const [user, loading] = useUser(uid)

  if (loading) {
    return (
      <View style={styles.dammyCard}>
        <ActivityIndicator />
      </View>
    )
  }

  return <UserCard user={user} onPressAvatar={() => onPressAvatar(uid)} />
}

// ListEmptyComponent
// -------------------------
const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>ユーザーが見つかりません</Text>
    </View>
  )
}

// UserList
// -------------------------
type UserListProps = {
  data: CloneUser[]
  onEndReached: () => void
  onPressAvatar?: (uid: string) => void
}

const UserList = ({ data, onEndReached, onPressAvatar }: UserListProps) => {
  return (
    <FlatList
      data={data}
      onEndReached={onEndReached}
      renderItem={({ item }) => <UserListItem uid={item.id} onPressAvatar={onPressAvatar} />}
      ListEmptyComponent={<ListEmptyComponent />}
    />
  )
}

const styles = StyleSheet.create({
  dammyCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
  },
  emptyWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
  },
})

export default UserList
