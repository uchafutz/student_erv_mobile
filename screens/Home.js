import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { AuthContext } from '../context/AuthContext'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { QuestionsContext } from '../context/QuestionsContext';
import { Dropdown } from 'react-native-element-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

const {logout, studentInfo, authToken} = useContext(AuthContext)
const {course, questions,fetchQuestionsDetails} = useContext(QuestionsContext)
const [lecture, setLecture] = useState(null);
const [module, setModule] = useState(null);
const [comment, setComment] = useState('');
const [rates, setRates] = useState(0);
const [isFocus, setIsFocus] = useState(false);
const [items, setItems] = useState([])


// fetchQuestionsDetails()

const lectures = []

course.modules.forEach((m) => {
    lectures.push({
    'label': m.lectures[0].users.name,
    'value': m.lectures[0].users.id,
    })
})

const map = new Map();
for (const lect of lectures) {
   map.set(lect["value"], lect);
}
const iteratorValues = map.values();
const lectures_options = [...iteratorValues];


// modules based on lecturer selected
const module_options = []

if (lecture) {
  course.modules.forEach((m) => {
    if (lecture == m.lectures[0].users.id) {
      module_options.push({
        'label': m.name,
        'value': m.id,
      })
    }
  })
}

const radio_props = [];


const static_qn_options = [
  {'label': 'Poor (4 Points)', 'value': 4},
  {'label': 'Moderate (6 Points)', 'value': 6},
  {'label': 'Very good (10 Points)', 'value': 10}
]


// {
//   "student_id": "1",
//   "lecture_id": "1",
//   "module_id" : "1",
//   "rates": "5",
//   "name": "comms",
//   "items" : [
//         {
//           "question_id":"2",
//           "answer_id":"1"
//         }
//   ]
// }


const setAnswer = (question_id, answer_id) => {
    setItems(prev => [...prev, {question_id,answer_id}])
}


const answer = {
  student_id: studentInfo.id,
  lecture_id: lecture,
  module_id: module,
  rates,
  name: comment,
  items
}


const submitAnswer = async () => {

  if (answer) {

    await axios.post('http://192.168.10.32:8001/api/comment/comments', {
       ...answer
    },
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
    )
    .then(function (response) {
      alert('Evaluation sent succesfull.')
      setLecture(null)
      setModule(null)
      setComment('')
      setItems([])
      setRates(0)
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
    
  }
}

  return (
    <SafeAreaView style = {SafeViewAndroid.AndroidSafeArea}>
    <KeyboardAwareScrollView>
    <View className="p-4 bg-slate-100">
        <View className="mt-1 flex-row justify-between">
          <View className="flex-row gap-2 items-center justify-center">
          <FontAwesome5 name="user-circle" size={42} color="#007fff"/>
          <View>
          <Text className="font-semibold">Welcome Back,</Text>
          <Text className="font-bold text-xl text-blue-500">{studentInfo.users.name}</Text>
          </View>
          </View>
        <TouchableOpacity className="h-10 px-5 m-2 rounded-md flex flex-row justify-center items-center border border-blue-500"
        onPress={() => logout()}
        >
          <Text className="font-bold">Logout</Text>
        </TouchableOpacity>
        </View>
        <View className="p-3 mt-7 rounded-md border border-blue-500">
            <View>
              <Text className="text-md font-semibold text-blue-500">Course: {studentInfo.courses.name.toUpperCase()}</Text>
              <Text className="text-md font-semibold text-blue-500">Department: {studentInfo.courses.departments.name.toUpperCase()}</Text>
            </View>
        </View>
        <View className="border-t border-blue-500 mt-5"></View>

        <View className="flex gap-2 mt-5">
          <Text className="font-semibold mb-2">Please choose the Lecturer and module below to start your evaluation,</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={lectures_options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select lecturer' : '...'}
          searchPlaceholder="Search..."
          value={lecture}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setLecture(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="user"
              size={20}
            />
          )}
        />
      
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={module_options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select module' : '...'}
          searchPlaceholder="Search..."
          value={module}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setModule(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        </View>


        <View className="mt-5 flex-col items-start justify-start">
          {
            lecture && module && (
              <View>
              <Text className="text-xl font-semibold">Question 1</Text>
              <Text className="font-semibold mb-2">How would you rate the teacher's knowledge of the subject matter?</Text>
                <RadioForm
                  radio_props={static_qn_options}
                  initial={0}
                  buttonSize={10}
                  formHorizontal={false}
                  onPress={(value) => {setRates(value)}}
                />
          </View>
            )
          }
          {
          lecture && module && questions.map((question,i) => {
            return (
              <View key={i} className="mt-5">
              <Text className="text-xl font-semibold">Question {i+2}</Text>
              <Text className="font-semibold mb-2">{question.name}</Text>
                 {
                 question.answer.forEach((ans) => {
                      radio_props.push({
                        label: ans.name,
                        value: ans.id
                      })
                 })
                 }
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  buttonSize={10}
                  formHorizontal={false}
                  onPress={(value) => {setAnswer(value, question.id)}}
                />
              </View>
            )
          })}
            
        </View>

        {lecture && module && (
          <>
          <View className="mt-5">
          <Text className="text-xl font-semibold">Comment</Text>
          <View className="mt-2 h-24 border border-gray-300 rounded-md">
          <TextInput
              underlineColorAndroid="transparent"
              placeholder="Type your comment....."
              placeholderTextColor="grey"
              numberOfLines={20}
              multiline={true}
              onChangeText={(value) => setComment(value)}
              value={comment}
              />
          </View>
          </View>   

          <View className="flex-row justify-end mt-10">
          <TouchableOpacity
            className="h-10 px-5 m-2 bg-blue-500 rounded-md flex flex-row justify-center items-center"
            onPress = {() => submitAnswer()}
          >
          <Text className="text-white text-base font-medium">Submit</Text>
          </TouchableOpacity>
          </View>
          </>
        )}
    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
})