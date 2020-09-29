import React from 'react'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../repositories/firebase'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'
import UpdateUserScreen from '../screens/UpdateUserScreen'
import CreateTweetScreen from '../screens/CreateTweetScreen'
import TweetScreen from '../screens/TweetScreen'

const Stack = createStackNavigator()

const TimelineStackNavigator = () => (
  <Stack.Navigator initialRouteName="Main" mode="modal">
    <Stack.Screen
      name="Main"
      component={HomeScreen}
      options={{
        // eslint-disable-next-line react/display-name
        headerTitle: () => <AntDesign name="twitter" size={30} color="#1da1f2" />,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="CreateTweet"
      component={CreateTweetScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={TimelineStackNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Tweet"
      component={TweetScreen}
      options={{
        headerTitle: 'ツイート',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{
        headerTitle: null,
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
)

const UserStackNavigator = () => {
  const [user] = useAuthState(firebase.auth())
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={UserScreen}
        options={{
          headerTitle: null,
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}
        initialParams={{ uid: user?.uid }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUserScreen}
        options={{
          headerTitle: '変更',
          headerBackTitleVisible: false,
        }}
        initialParams={{ uid: user?.uid }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    tabBarOptions={{ showLabel: false }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({}) => {
        if (route.name === 'HomeTab') {
          return <MaterialCommunityIcons name="home" size={24} />
        }
        if (route.name === 'UserTab') {
          return <MaterialCommunityIcons name="account" size={24} />
        }
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
    <Tab.Screen name="UserTab" component={UserStackNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
