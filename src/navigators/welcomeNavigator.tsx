import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: false, animationEnabled: false }}>
    <Stack.Screen
      name="Main"
      component={WelcomeScreen}
      options={{
        // eslint-disable-next-line react/display-name
        headerTitle: () => <AntDesign name="twitter" size={30} color="#1da1f2" />,
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
)

export default WelcomeNavigator
