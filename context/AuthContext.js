import axios from "axios";
import React, { createContext, useContext, useState } from "react";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [authToken, setAuthToken] = useState('mm')
    const [studentInfo, setStudentInfo] = useState({})


    const login = async (studentId, password) => {

    if (studentId && password) {
    await axios.post('http://192.168.213.66:8001/api/authentication/login', {
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
    else{
        alert('Please enter studentId and password.')
    }
    }

    const logout = () =>{
      setAuthToken(null)
      setStudentInfo({})
    }
    
    return (
      <AuthContext.Provider value={{authToken, login, logout, studentInfo}}>
      {children}
      </AuthContext.Provider>
    )


}