import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'
import { Button, Card } from "react-bootstrap"
import apiUtil from '../../utils/apiUtil'

function SingleQuestionStudent(props) {
    const content = Object.keys(props.question.content)
    const answers = Object.keys(props.question.answers)
    const [ radioOptionSelected, setRadioOptionSelected ] = useState([])
    const [ checkboxOptionsSelected, setCheckboxOptionsSelected ] = useState([])
    const [ submissionError, setSubmissionError ] = useState()

    const createResponse = async (e) => {
        e.preventDefault()
        let response = await apiUtil("post", `courses/${props.courseId}/lectures/${props.lectureId}/questions/${props.question.id}/responses`, { dispatch: dispatch, navigate: navigate}, { answers: (props.question.type === 'multiple choice') ? radioOptionSelected : checkboxOptionsSelected })
        if (response.status != 201) {
            setSubmissionError(response.message)
        }
    }

    const onValueChangeRadio = (e) => {
        e.preventDefault()
        let currAnswers = []
        for (let i = 0; i < content.length; i++) {
            currAnswers.push(e.target.value === content[i])
        }
        setRadioOptionSelected(currAnswers)
    }

    const onValueChangeCheckbox = (e) => {
        e.preventDefault()
        let currAnswers = []
        for (let i = 0; i < content.length; i++) {
            if (e.target.value === content[i]) {
                currAnswers.push(e.target.checked)
            }
            else {
                currAnswers.push((checkboxOptionsSelected[i]) ? checkboxOptionsSelected[i] : false)
            }
        }
        setCheckboxOptionsSelected(currAnswers)
    }

    return (
        <>
            {
                (!props.response) ? 
                <>
                    <h1>
                        { props.question.stem }
                    </h1>
                    <form>
                        {content.map( (option, index) =>
                            {(props.question.type == 'multiple choice') ? 
                                <div key={index}>
                                    <input type="radio" id={index} value={option} onChange={onValueChangeRadio}></input>
                                    <label for={index}>{option}</label>
                                </div> :
                                (props.question.type == 'multiple answer') ?
                                    <div key={index}>
                                        <input type="checkbox" id={index} key={index} value={option} onChange={onValueChangeCheckbox}></input>
                                        <label for={index}>{option}</label>
                                    </div> :
                                    <Notice error={false} key={index} message={"Only multiple choice and multiple answer are supported"}/>
                            }
                        )}
                    </form>
                    <button className="btn btn-primary" onClick={((e) => createResponse(e))}>Submit</button>
                </> : 
                <>
                    <h1>
                        { props.question.stem }
                    </h1>
                    {content.map( (option, index) =>
                        <div key={index}>
                            {
                                (answers[index] === true) ? <p>{index}. {option} (correct answer)</p> : <p>{index}. {option}</p>
                            }
                        </div>
                    )}
                    <h2>
                        Score: { props.response.score }
                    </h2>
                </>
            }
        </>
    )
}

export default SingleQuestionStudent