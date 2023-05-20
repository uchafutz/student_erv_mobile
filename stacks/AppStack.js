import { useContext, useEffect } from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuestionsContext } from '../context/QuestionsContext';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
const {fetchQuestionsDetails} = useContext(QuestionsContext)
const {authToken} = useContext(AuthContext)
  

// useEffect(()=>{
//   // if (authToken) {
//   //   fetchQuestionsDetails()
//   // }
//   console.log('useeffect of appstack');
// },[authToken])


  return (
    <Stack.Navigator screenOptions={
      {
        headerShown: false
      }
    }>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};