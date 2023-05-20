import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './context/AuthContext'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { QuestionsContext } from './context/QuestionsContext'


const Router = () => {
  const {authToken, studentInfo} = useContext(AuthContext)
  const {fetchQuestionsDetails} = useContext(QuestionsContext)


  useEffect(()=>{
    if (authToken) {
      fetchQuestionsDetails(studentInfo)  
    }
    console.log('useeffect of router');
  },[authToken])
  

  return (
    <NavigationContainer>
      {authToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router