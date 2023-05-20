import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const QuestionsContext = createContext()


export const QuestionsContextProvider = ({ children }) => {
    const [mount, setMount] = useState(false)
    const [course, setCourse] = useState({})
    const [questions, setQuestions] = useState([])
    const { authToken, studentInfo, AuthId } = useContext(AuthContext)
    useEffect(() => {
        if (mount == false) true
        setMount(true)


    }, [mount])

    useEffect(() => {
        if (mount) true


    }, [AuthId])

    const fetchQuestionsDetails = async () => {

        await axios.get(`http://192.168.10.27:8001/api/department/students/${AuthId}`, {
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