import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useCourse from "../hooks/useCourse"
import useLectureQuestions from "../hooks/useLectureQuestions"
import useResponse from '../hooks/useResponse'
import SingleQuestionStudent from '../components/questions/SingleQuestionStudent'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'

function SingleQuestion(props) {
    const { courseId, lectureId, questionId } = useParams()
    const [ course, role, Cmessage, Cerror, Cloading ] = useCourse()
    //console.log(course)
    const [ question, response, rMessage, rError, rLoading ] = useResponse(course)
    const [ questions, lMessage, lError, lLoading] = useLectureQuestions()
    //console.log("questions", questions)
    const teacherQuestion = (questions.questions.length > 0) ? questions.questions.filter(question => question.id == questionId) : []
    //console.log("teacherQuestions", teacherQuestion)
    const error = Cmessage || rMessage || lMessage
    const loading = Cloading || rLoading || lLoading
    // console.log("Cloading:", Cloading)
    // console.log("Cerror:", Cerror)
    // console.log("rLoading:", rLoading)
    // console.log("rError:", rError)
    // console.log("lLoading:", lLoading)
    // console.log("lError:", lError)
    return (
        <>
            { Cmessage ? <Notice error={Cerror ? "error" : ""} message={Cmessage}/> : <></>}
            { rMessage ? <Notice error={rError ? "error" : ""} message={rMessage}/> : <></>}
            { lMessage ? <Notice error={lError ? "error" : ""} message={lMessage}/> : <></>}
            { loading ? <TailSpin visible={true} /> : <></> }
            { (!error && !loading) ? ((role === 'student') ? <SingleQuestionStudent question={question} response={response} courseId={courseId} lectureId={lectureId} questionId={questionId}/> : <SingleQuestionTeacher question={teacherQuestion[0]} />) : <></> }
        </>
    )
}

export default SingleQuestion