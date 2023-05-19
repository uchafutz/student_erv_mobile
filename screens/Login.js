import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login = () => {

const [studentId, setStudentId] = useState("")
const [password, setPassword] = useState("")

const {login} = useContext(AuthContext);


  return (
    <KeyboardAwareScrollView>
    <View className="min-h-screen">
      <View className="flex-1 items-center justify-center bg-slate-100">
      <View className="p-8 w-full max-w-sm">
        <Text className="text-3xl font-bold mb-6 text-slate-900 text-center">EVALUATION SYSTEM</Text>
        <Text className="text-2xl font-bold mb-6 text-slate-900 text-center">Login</Text>

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholder="Enter student id"
          value={studentId}
          onChangeText={(value) => setStudentId(value)}
        />

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <View className="flex flex-row justify-between items-center my-8">
          <Pressable>
            <Text className="text-blue-400 font-bold">Reset password</Text>
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={() => login(studentId,password)}
          className="h-12 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6"
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </KeyboardAwareScrollView>

  )
}

export default Login
