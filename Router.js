import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './context/AuthContext'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'


const Router = () => {
  const {authToken} = useContext(AuthContext)

  return (
    <NavigationContainer>
      {authToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router