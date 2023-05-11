import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useLectureQuestions from "../hooks/useLectureQuestions";
import useCourse from "../hooks/useCourse";
import { Switch } from '@mui/material';
import useLectures from '../hooks/useLectures';
import QuestionCard from '../components/QuestionCard';
import { useEffect, useState } from 'react'

function Lecture() {
    const [questions, message, error, loading] = useLectureQuestions()
    const [course, role, Cmessage, Cerror, Cloading ] = useCourse()
    const [lectures, Lmessage, Lerror, Lloading] = useLectures()
    const { courseId, lectureId } = useParams()
    
    async function getPublishState(){
        return !!lectures[courseId][lectureId-1].LectureForSections[0].published
    }

    console.log("questions", questions)

    return (
        <>
            {/*If Student*/}
            {/*TODO: have question forms displayed here?*/}            

            {/*If Teacher*/}
            {(Cloading|Lloading) ? <TailSpin visible={true}/> : (role == "teacher" &&
                <div className='teacher-lecture'>
                    <div className='buttons'>
                        <Link to={`addquestion`}>
                            <Button variant="secondary">Add Question</Button>
                        </Link>
                    </div>

                    <div className='switch'>
                        <label>
                            <span>Publish Lecture</span>
                            {/*TODO: published lectures in lecture for sections*/}
                            <Switch checked={!!getPublishState()}/>
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