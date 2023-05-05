import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'
import { Button, Card } from "react-bootstrap"

function SingleQuestionStudent(props) {
    const content = Object.keys(props.question.content)
    const answers = Object.keys(props.question.answers)
    return (
        <>
            <h1>
                { props.question.stem }
            </h1>
            <form>
                {content.map( (option, index) =>
                    {(props.question.type == 'multiple choice') ? 
                        <>
                            <input type="radio" id={index} key={index} value={option}></input>
                            <label for={index}>{option}</label>
                        </> :
                        (props.question.type == 'multiple answer') ?
                            <>
                                <input type="checkbox" id={index} key={index} value={option}></input>
                                <label for={index}>{option}</label>
                            </> :
                            <Notice error={false} message={"Only multiple choice and multiple answer are supported"}/>
                    }
                )}
            </form>
            <Button variant="secondary">Submit</Button>
        </>
    )
}

export default SingleQuestionStudent