import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useLectureQuestions from "../hooks/useLectureQuestions";
import useCourse from "../hooks/useCourse";
import { Switch } from '@mui/material';
import useLectures from '../hooks/useLectures';
import QuestionCard from '../components/QuestionCard';
import { useEffect, useState } from 'react'
import apiUtil from '../utils/apiUtil'
import { useDispatch } from 'react-redux';

function Lecture() {
    const [questions, message, error, loading] = useLectureQuestions()
    const [course, role, Cmessage, Cerror, Cloading ] = useCourse()
    const [lectures, Lmessage, Lerror, Lloading] = useLectures()
    const { courseId, lectureId } = useParams()
    const [published, setPublished] = useState(awaitPublish())
    //const sectionId = lectures[courseId][lectureId-1].LectureForSections[0].id
    const [load, setLoading] = useState(false)
    const [apiError, setError] = useState(false)
    const [apiMessage, setMessage] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function awaitPublish(){
        return await !!lectures[courseId][lectureId-1].LectureForSections[0].published
    }

    //TODO: fix this mess
    //console.log(sectionId)

    /*async function changePublishState(){
        setLoading(true)
        const response = await apiUtil("put", `/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`, { dispatch: dispatch, navigate: navigate})
        setLoading(false)
        setError(response.error)
        setMessage(response.message)

        if(response.status === 200){
            //TODO: add redux implementation
            console.log("uhhhh: ", response)
            console.log("published: ", published)
            setPublished(!published)
            console.log("hm: ", published)
        }
    }*/

    return (
        <>
            { Cmessage ? <Notice error={Cerror ? "error" : ""} message={Cmessage}/> : <></>}
            { Lmessage ? <Notice error={Lerror ? "error" : ""} message={Lmessage}/> : <></>}
            { message ? <Notice error={error ? "error" : ""} message={message}/> : <></>}

            {/*If Student*/}
            {(Cloading|Lloading|loading) ? <TailSpin visible={true}/> : (role == "student" &&
                <div className='student-lecture'>
                    <div className='questions'>
                        {loading ? <TailSpin visible={true}/> : questions.questions.map((question) => {
                            return <QuestionCard key={question.id} question={question} view={role} courseId={courseId} lectureId={lectureId}/>
                        })}
                    </div>
                </div>
            )}            

            {/*If Teacher*/}
            {(Cloading|Lloading|loading) ? <TailSpin visible={true}/> : (role == "teacher" &&
                <div className='teacher-lecture'>
                    <div className='buttons'>
                        <Link to={`addquestion`}>
                            <Button variant="secondary">Add Question</Button>
                        </Link>
                    </div>

                    <div className='switch'>
                        <label>
                            <span>Publish Lecture - WIP</span>
                            {/*TODO: published lectures in lecture for sections*/}
                            <Switch checked={published}/>
                        </label>
                    </div>

                    <div className='questions'>
                        {loading ? <TailSpin visible={true}/> : questions.questions.map((question) => {
                            return <QuestionCard key={question.id} question={question} view={role} courseId={courseId} lectureId={lectureId}/>
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Lecture