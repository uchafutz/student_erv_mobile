import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

const defaultAuth = {
  token: "",
  id: ""
}
export const AuthContextProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [studentInfo, setStudentInfo] = useState({})
  const [AuthId, setAuthId] = useState(null)
  const [courseData, setCourse] = useState({})
  const [questionData, setQuestions] = useState([])

  const login = async (studentId, password) => {

    if (studentId && password) {
      await axios.post('http://192.168.10.27:8001/api/authentication/login', {
        reg_id: studentId,
        password
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
        .then(function (response) {
          setStudentInfo(response.data.student[0])
          //  console.log(response.data.student[0]);
          setAuthToken(response.data.token)
          setAuthId(response.data.student[0].id)
        })
        .catch(function (error) {
          alert("Please provide correct credentials.")
        });

    }
    else {
      alert('Please enter studentId and password.')
    }
  }









  console.log("AUth data", AuthId);
  console.log(" data", courseData);
  console.log(" data", questionData);

  useEffect(() => {
    const Questionfetch = async (AuthId) => {
      if (AuthId) {
        await axios.get(`http://192.168.10.27:8001/api/department/students/${AuthId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }).then(response => {
          setCourse(response.data.course[0])
          console.log(response.data.course[0]);
          response.data.questions.forEach((question) => {
            setQuestions(prev => [...prev, question])
          })

        }).catch(function (error) {
          console.log(`serve in valid request.${error}`)
        });


      }


    }
    Questionfetch(AuthId);
  }, [AuthId])

  console.log("AUth data", AuthId);
  console.log(" data", courseData);
  console.log(" data", questionData);
  const logout = () => {
    setAuthToken(null)
    setAuthId(null)
  }

  return (
    <AuthContext.Provider value={{ authToken, login, isLoading, logout, studentInfo, AuthId, courseData, questionData }}>
      {children}
    </AuthContext.Provider>
  )


}