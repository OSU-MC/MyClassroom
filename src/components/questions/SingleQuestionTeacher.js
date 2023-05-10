import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'
import { Button, Card } from "react-bootstrap"

function SingleQuestionTeacher(props) {
    const content = Object.values(props.question.content.options)
    console.log(content)
    const answers = Object.values(props.question.answers)
    console.log(answers)
    return (
        <>
            <h1>
                { props.question.stem }
            </h1>
            <p>
                { props.question.type }
            </p>
            <ul>
                {content.map( (option, index) =>
                    <div key={index}>
                        {
                            (answers[index] === true) ? <li>{option} (correct answer)</li> : <li>{option}</li>
                        }
                    </div>
                )}
            </ul>
            {/* <button className="btn btn-primary" onClick={((e) => addQuestionsToLecture(e))}>Submit</button> */}
        </>
    )
}

export default SingleQuestionTeacher