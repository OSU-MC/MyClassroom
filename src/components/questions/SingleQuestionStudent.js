import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'
import { Button, Card } from "react-bootstrap"
import apiUtil from '../../utils/apiUtil'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function SingleQuestionStudent(props) {
    //console.log("singlequestionstudent:", props.question)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const content = Object.values(props.question.content.options)
    const answers = Object.values(props.question.answers)
    const [ radioOptionSelected, setRadioOptionSelected ] = useState([false, false, false, false])
    const [ radioChecked, setRadioChecked ] = useState()
    const [ checkboxOptionsSelected, setCheckboxOptionsSelected ] = useState([false, false, false, false])
    const [ submissionError, setSubmissionError ] = useState()

    const createResponse = async (e) => {
        e.preventDefault()
        if (props.question.type === 'multiple choice' && radioChecked == null) {
            alert("Please select an answer to the question before submitting")
        }
        else {
            let response = await apiUtil("post", `courses/${props.courseId}/lectures/${props.lectureId}/questions/${props.question.id}/responses`, { dispatch: dispatch, navigate: navigate}, { answers: (props.question.type === 'multiple choice') ? radioOptionSelected : checkboxOptionsSelected })
            if (response.status != 201) {
                setSubmissionError(response.message)
            }
            window.location.reload(false);
        }
    }

    const onValueChangeRadio = (e) => {
        const nextRadioOptionSelected = radioOptionSelected.map((option, index) => e.target.value == content[index])
        setRadioOptionSelected(nextRadioOptionSelected)
        setRadioChecked(e.target.value)
    }

    const onValueChangeCheckbox = (e) => {
        const nextCheckboxOptionsSelected = checkboxOptionsSelected.map((option, index) => (e.target.value == content[index]) ? e.target.checked : option)
        setCheckboxOptionsSelected(nextCheckboxOptionsSelected)
    }

    return (
        <>
            {
                (!props.response) ? 
                <>
                    <h1 className="question-stem">
                        { props.question.stem }
                    </h1>
                    <form>
                        {content.map( (option, index) =>
                            <div key={index}>
                                {(props.question.type == 'multiple choice') ? 
                                    <>
                                        <input type="radio" id={index} value={option} checked={radioChecked == option.toString()} onChange={onValueChangeRadio}></input>
                                        <label htmlFor={index}>{option}</label>
                                    </> :
                                    (props.question.type == 'multiple answer') ?
                                        <>
                                            <input type="checkbox" id={index} key={index} value={option} onChange={onValueChangeCheckbox}></input>
                                            <label htmlFor={index}>{option}</label>
                                        </> :
                                        <Notice error={false} key={index} message={"Only multiple choice and multiple answer are supported"}/>
                                }
                            </div>
                        )}
                    </form>
                    <Link to={`/${props.courseId}/lectures/${props.lectureId}/questions/${props.questionId}`}>
                        <button className="btn btn-primary" onClick={((e) => createResponse(e))}>Submit</button>
                    </Link>
                </> : 
                <>
                    <h1 className="question-stem">
                        { props.question.stem }
                    </h1>
                    <ul>
                        {content.map( (option, index) =>
                            (answers[index] === true && props.response.submission[index] === true) ? <li key={index}>{option} (correct answer) (chosen answer)</li> : (answers[index] === true) ? <li key={index}>{option} (correct answer)</li> : (props.response.submission[index] === true) ? <li key={index}>{option} (chosen answer)</li> : <li key={index}>{option}</li>
                        )}
                    </ul>
                    <h2>
                        Score: { props.response.score }
                    </h2>
                </>
            }
        </>
    )
}

export default SingleQuestionStudent