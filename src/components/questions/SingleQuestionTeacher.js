import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'
import { Button, Card } from "react-bootstrap"

function SingleQuestionTeacher(props) {
<<<<<<< HEAD
    const [ editing, setEditing ] = useState(false)
    const [ stem, setStem ] = useState("")
    const [ type, setType ] = useState("")
    const [ content, setContent ] = useState({
        0: "",
        1: "",
        2: "",
        3: ""
    })
    const [ answers, setAnswers ] = useState({
        0: false,
        1: true,
        2: false,
        3: false
    })
    
    const addAnswer = (e) => {
        e.preventDefault()
    }

    const createQuestion = (e) => {
        e.preventDefault()
    }

    const updateContent = (value, index) => {

    }

    const updateAnswers = (value, index) => {

    }

    if (props.question) {
        const answers = Object.keys(props.question.answers)
        return (
            <>
                <h1>
                    { props.question.stem }
                </h1>
                <p>
                    { props.question.type }
                </p>
                {Object.keys(props.question.content).map( (option, index) =>
                    <div key={index}>
                        {
                            (answers[index] === true) ? <p>{index}. {option} (correct answer)</p> : <p>{index}. {option}</p>
                        }
                    </div>
                )}
                {/* <button className="btn btn-primary" onClick={((e) => addQuestionsToLecture(e))}>Submit</button> */}
            </>
        )
    }
    else {
        return (
            <form>
                <label>Question Stem:</label>
                <input type="text" placeholder="What is 1 + 1?" name="stem" id="stem" value={stem} onChange={(e) => setStem(e.target.value)}></input>
                <label>Question Type:</label>
                <select id="question-type" name="question-type">
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="multiple-answer">Multiple Answer</option>
                </select>
                <button type="button" onClick={(e) => { addAnswer(e) }}>+</button>
                    {
                        Object.entries(content).map( (option, index) => {
                            console.log(index)
                            console.log(option[1])
                            return <div key={index}>
                                <input type="radio" name="answers" onChange={(e) => updateContent(e)}></input>
                                <input type="text" value={option[1]} onChange={(e) => updateAnswers(e.target.value, index)}></input>
                            </div>
                        })
                    }
                <button type="submit" onClick={(e) => { createQuestion(e) }}>Create Question</button>
            </form>
        )
    }
}

export default SingleQuestionTeacher