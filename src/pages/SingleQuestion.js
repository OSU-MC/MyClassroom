import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"

function handleSubmit(event) {
    event.preventDefault()
}

function SingleQuestion(props) {
    const error = !(props.question.type && props.question.stem && props.question.content && props.question.answers)
    const content = Object.keys(props.question.content)
    const answers = Object.keys(props.question.answers)
    return (
        <>
            { error ? <Notice error={false} message={"Error fecthing question"}/> : (
                <>
                    <h1>
                        { props.question.stem }
                    </h1>
                    <form onSubmit={handleSubmit}>
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
                    <Button variant="secondary" type="submit">Submit</Button>
                </>

            )}
        </>
    )
}

export default SingleQuestion