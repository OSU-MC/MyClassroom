import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'
import { TailSpin } from  'react-loader-spinner'
import { togglePublishedForQuestionInLecture } from '../redux/actions'

function QuestionCard(props){
    //get the question published state
    //const options = Object.entries(props.question.content.options)
    const [published, setPublished] = useState(!!props.question.published)
    const { courseId, lectureId } = useParams()
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //(un)publish a question
    //called on switch onChange()
    async function changePublishState(){
        //call the api for an update 
        setLoading(true)
        const response = await apiUtil("put", `/courses/${props.courseId}/lectures/${props.lectureId}/questions/${props.question.id}}`, { dispatch: dispatch, navigate: navigate})
        setLoading(false)
        setError(response.error)
        setMessage(response.message)

        if(response.status === 200) {
            dispatch(togglePublishedForQuestionInLecture(lectureId, props.question.id))
            setPublished(!published)
        }
    }

    return(
        <>
        {(loading) ? <TailSpin visible={true}/> : (props.view == "student" &&
        <div className="question-card-student">
            <Card>
                <Card.Header>{props.question.stem}</Card.Header>
                <Card.Body>
                    <p>{props.question.type}</p>

                    <Link to={`questions/${props.question.id}`}>
                        <Button className="editQuestionBtn">
                            View Question
                        </Button>
                    </Link>

                </Card.Body>
            </Card>
        </div>
        )}

        {(loading) ? <TailSpin visible={true}/> : (props.view == "teacher" &&
        <div className="question-card-teacher">
            <Card>
                <Card.Header>{props.question.stem}</Card.Header>
                <Card.Body>
                    <p>{props.question.type}</p>
                    
                    <Button onClick={() => navigate(`questions/${props.question.id}`)} className="editQuestionBtn">
                            Edit Question
                     </Button>
                    
                    {/*Default is published state of lecture*/}
                    <div className='switch'>
                        <label>
                            <span>Publish Question</span>
                            {/*TODO: published questions in questions for lectures*/}
                            <Switch onChange={() => changePublishState()} checked={published}/>
                        </label>
                    </div>
                </Card.Body>
            </Card>
        </div>
        )}
        </>
    )
}

export default QuestionCard;