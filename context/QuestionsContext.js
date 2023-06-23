import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const QuestionsContext = createContext()


export const QuestionsContextProvider = ({children})=> {

    const [course, setCourse] = useState({})
    const [questions, setQuestions] = useState([])
    const {authToken, studentInfo} = useContext(AuthContext)


    const fetchQuestionsDetails = async () =>{
        console.log('AUTH TOKEN: ',authToken);
        console.log('STUDENT ID: ',studentInfo.id);
        await axios.get(`http://192.168.10.32:8001/api/department/students/${studentInfo.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            setCourse(response.data.courseData[0])
            console.log('STATE DATA: ', course);
        }).catch(e => {
            console.log(e);
        })

    }


    const resetCourseInfo = () => {
        setCourse({})
        setCourse([])
    }


    useEffect(() => {
        fetchQuestionsDetails()
    },[authToken])
   

    return (
        <QuestionsContext.Provider value={{course,questions,fetchQuestionsDetails, resetCourseInfo}}>
            {children}
        </QuestionsContext.Provider>
    )
}