import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'

function QuestionCard(props){
    //get the question published state
    const options = Object.entries(props.question.content.options)
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

        if(response.status === 200){
            setPublished(!published)
        }
    }

    return(
        <>
        <div className="question-card">
            <Card>
                <Card.Header>{props.question.stem}</Card.Header>
                <Card.Body>
                    <p>{props.question.type}</p>

                    {(props.question.type == "multiple choice") &&
                        <div className="multiple-choice-responses" >
                            <p>
                                Responses: {options.map((option) => {return option[1] + ", "; })}
                            </p>
                        </div>
                    }

                    {/*TODO: current link for edit question, feel free to change*/}
                    <Link to={`questions/${props.question.id}`}>
                        <Button className="editQuestionBtn">
                            Edit Question
                        </Button>
                    </Link>

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
        </>
    )
}

export default QuestionCard;