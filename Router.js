import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './context/AuthContext'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { QuestionsContext } from './context/QuestionsContext'


const Router = () => {
  const { authToken, studentInfo, AuthId } = useContext(AuthContext)
  const { fetchQuestionsDetails, course, questions } = useContext(QuestionsContext)

  useEffect(() => {
    if (AuthId) {
      fetchQuestionsDetails()
    }


  }, [AuthId])


  return (
    <NavigationContainer>
      {authToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router