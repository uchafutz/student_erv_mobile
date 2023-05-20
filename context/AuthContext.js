import axios from "axios";
import React, { createContext, useState } from "react";
import { endpointurl } from "../api/api";

export const AuthContext = createContext()

const userInformation = {
  user_id: "",
  token: ""
}
export const AuthContextProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [studentInfo, setStudentInfo] = useState({})

  const login = async (studentId, password) => {

    if (studentId && password) {
      await axios.post(`${endpointurl}api/authentication/login`, {
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
          setAuthToken(response.data.token)
        })
        .catch(function (error) {
          alert("Please provide correct credentials.")
        });

    }
    else {
      alert('Please enter studentId and password.')
    }
  }

  const logout = () => {
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider value={{ authToken, login, isLoading, logout, studentInfo }}>
      {children}
    </AuthContext.Provider>
  )


}