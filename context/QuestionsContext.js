import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const QuestionsContext = createContext()


export const QuestionsContextProvider = ({children})=> {

    const [course, setCourse] = useState({})
    const [questions, setQuestions] = useState([])
    // const {authToken, studentInfo} = useContext(AuthContext)


    const fetchQuestionsDetails = async (studentInfo) =>{
        console.log(studentInfo.id);
        // console.log(authToken);

        await axios.get(`http://192.168.213.66:8001/api/department/students/${studentInfo.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}`
            }
        }).then(response => {
            setCourse(response.data.course[0])
            response.data.questions.forEach((question) => {
                 setQuestions(prev => [...prev, question])
            })
            console.log(questions);
        }).catch(e => {
            console.log(e);
        })

    }


    const resetCourseInfo = () => {
        setCourse({})
        setCourse([])
    }
   

    return (
        <QuestionsContext.Provider value={{course,questions,fetchQuestionsDetails, resetCourseInfo}}>
            {children}
        </QuestionsContext.Provider>
    )
}