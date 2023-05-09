import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useCourse from "../hooks/useCourse";
import SingleQuestionStudent from '../components/questions/SingleQuestionStudent'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'
import useResponse from '../hooks/useResponse';

function SingleQuestion(props) {
    const { courseId, lectureId, questionId } = useParams()
    const [ course, role, Cmessage, Cerror, Cloading ] = useCourse()
    const [ question, response, rMessage, rError, rLoading ] = (role === "student" && course) ? useResponse(course) : null
    const [ questions, lMessage, lError, lLoading] = (role === "teacher") ? useLectureQuestions() : null
    const teacherQuestion = (questions) ? questions.filter(question => question.id == questionId) : questions
    const error = Cmessage || rMessage || lMessage
    const loading = Cloading || rLoading || lLoading
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