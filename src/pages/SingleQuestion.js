import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import SingleQuestionStudent from '../components/questions/SingleQuestionStudent'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'

function SingleQuestion(props) {
    const error = !(props.question.type && props.question.stem && props.question.content && props.question.answers)
    return (
        <>
            { error ? <Notice error={false} message={"Error fetching question"}/> : 
                (props.role === 'student') ? <SingleQuestionStudent question={props.question} role={props.role}/> : <SingleQuestionTeacher question={props.question} role={props.role}/>
            }
        </>
    )
}

export default SingleQuestion