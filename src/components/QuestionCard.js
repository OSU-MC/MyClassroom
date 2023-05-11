import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { TailSpin } from  'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function QuestionCard(props){
    //get the question published state
    const options = Object.entries(props.question.content.options)
    const published = !!props.question.published
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                            <Switch checked={published}/>
                        </label>
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default QuestionCard;