import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { endpointurl } from "../api/api";

export const QuestionsContext = createContext()


export const QuestionsContextProvider = ({ children }) => {

    const [course, setCourse] = useState({})
    const [questions, setQuestions] = useState([])
    const { authToken } = useContext(AuthContext)
    const { studentInfo } = useContext(AuthContext)


    const fetchQuestionsDetails = async () => {

        await axios.get(`${endpointurl}api/department/students/${studentInfo.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }).then(response => {
            setCourse(response.data.course[0])
            response.data.questions.forEach((question) => {
                setQuestions(prev => [...prev, question])
            })
        }).catch(e => {
            console.log(e);
        })

    }


    return (
        <QuestionsContext.Provider value={{ course, questions, fetchQuestionsDetails }}>
            {children}
        </QuestionsContext.Provider>
    )
}