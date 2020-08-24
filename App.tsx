import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigators/appNavigator'

// ここでリターンされるコンポーネントがアプリ上で表示される。
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default App
