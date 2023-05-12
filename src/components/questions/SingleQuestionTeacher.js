import { React, useState, useEffect } from 'react';
import { TailSpin } from  'react-loader-spinner'
import Notice from '../Notice'

function SingleQuestionTeacher(props) {
    const editable = props.editable || false
    const [ question, setQuestion ] = useState(props.question)
    const [ editing, setEditing ] = useState(props.editing || false)
    const [ stem, setStem ] = useState("")
    const [ type, setType ] = useState("multiple choice")
    const [ options, setOptions ] = useState({
        0: "",
        1: "",
        2: "",
        3: ""
    })
    const [ answers, setAnswers ] = useState(question?.answers || {
        0: false,
        1: false,
        2: false,
        3: false
    })

    useEffect(() => {
        setStem(question?.stem || "")
        setType(question?.type || "multiple choice")
        setOptions(question?.content?.options || {
            0: "",
            1: "",
            2: "",
            3: ""
        })
        setAnswers(question?.answers || {
            0: false,
            1: false,
            2: false,
            3: false
        })
    }, [ question ])
    
    const addAnswer = (e) => {
        e.preventDefault()
        setOptions({
            ...options,
            [Object.keys(options).length]: ""
        })
        setAnswers({
            ...answers,
            [Object.keys(answers).length]: false
        })
    }

    const updateQuestion = (e) => {
        e.preventDefault()
        if (question != null) {
            // TODO: update the question
        }
        else {
            // TODO: create the question
        }
        setEditing(false)
        setQuestion({
            stem: stem,
            type: type,
            content: {
                options: options
            },
            answers: answers
        })
        console.log("create question clicked")
    }

    const updateOptions = (value, index) => {
        setOptions({
            ...options,
            [index]: value
        })
    }

    const updateAnswers = (index) => {
        let newAnswers = {...answers}
        switch(type) {
            case "multiple choice":
                Object.keys(answers).forEach((key) => {
                    newAnswers[key] = false
                })
                newAnswers = {...newAnswers, [index]: true}
                break
            case "multiple answer":
                newAnswers = {...newAnswers, [index]: !answers[index]}
                break
            default:
                throw Error("type is not understood!")
        }
        setAnswers(newAnswers)
    }

    const changeType = (newType) => {
        let newAnswers = {...answers}
        switch(newType) {
            case "multiple choice":
                let answerFound = false
                Object.keys(answers).forEach((key) => {
                    let value = answers[key]
                    if (value == true && !answerFound) {
                        answerFound = true
                        newAnswers[key] = true
                    }
                    else {
                        newAnswers[key] = false
                    }
                })
                setAnswers(newAnswers)
                break
            case "multiple answer":
                break
            default:
                throw Error("type is not understood")
        }
        setType(newType)
    }

    const removeAnswer = (e, index) => {
        e.preventDefault()
        let newAnswers = {}
        Object.keys(answers).forEach((key) => {
            let answer = answers[key]
            if (key < index) {
                newAnswers[key] = answer
            }
            else if (key > index) {
                newAnswers[key - 1] = answer
            }
        })
        let newOptions = {}
        Object.keys(options).forEach((key) => {
            let text = options[key]
            if (key < index) {
                newOptions[key] = text
            }
            else if (key > index) {
                newOptions[key - 1] = text
            }
        })
        setAnswers(newAnswers)
        setOptions(newOptions)
    }

    const moveAnswer = (e, index, value) => {
        e.preventDefault()
        let newAnswers = {...answers}
        let newOptions = {...options}
        
        let movedAnswer = newAnswers[parseInt(index)]
        newAnswers[index] = newAnswers[parseInt(index) + value]
        newAnswers[parseInt(index) + value] = movedAnswer

        let movedOptions = newOptions[parseInt(index)]
        newOptions[index] = newOptions[parseInt(index) + value]
        newOptions[parseInt(index) + value] = movedOptions

        console.log(newAnswers)
        console.log(newOptions)

        setAnswers(newAnswers)
        setOptions(newOptions)
    }

    if (editing) {
        return (
            <form>
                <label>Question Stem:</label>
                <input type="text" placeholder="What is 1 + 1?" name="stem" id="stem" value={stem} onChange={(e) => setStem(e.target.value)}></input>
                <label>Question Type:</label>
                <select id="question-type" name="question-type" value={type} onChange={(e) => changeType(e.target.value)}>
                    <option value="multiple choice">Multiple Choice</option>
                    <option value="multiple answer">Multiple Answer</option>
                </select>
                { Object.keys(options).length < 10 && <button className="btn btn-add" type="button" onClick={(e) => { addAnswer(e) }}>+</button> }
                    {
                        Object.keys(options).map( (index) => {
                            let option = options[index]
                            return <div className="question-option" key={index}>
                                <input type={type == 'multiple choice' ? 'radio' : 'checkbox'} name="answers" checked={answers[index]} onChange={(e) => updateAnswers(index)}></input>
                                <input type="text" value={option} onChange={(e) => updateOptions(e.target.value, index)}></input>
                                <div>
                                    <button disabled={index == 0} type="button" onClick={(e) => { moveAnswer(e, index, -1) }}>{'\u2191'}</button>
                                    <button disabled={index == Object.keys(options).length - 1} type="button" onClick={(e) => { moveAnswer(e, index, 1) }}>{'\u2193'}</button>
                                </div>
                                { Object.keys(options).length > 2 && <button type="button" className="btn negative-btn" onClick={(e) => { removeAnswer(e, index) }}>x</button> }
                            </div>
                        })
                    }
                <button className="btn btn-add" type="submit" onClick={(e) => { updateQuestion(e) }}>{ question ? 'Save Question' : 'Create Question'}</button>
            </form>
        )
    }
    else {
        return <div>
            <h1>
                { question.stem }
            </h1>
            <ul>
                { 
                    Object.keys(options).map( (index) => {
                        let option = options[index]
                        return (answers[index] === true) ? <li key={index}>{option} (correct answer)</li> : <li key={index}>{option}</li>
                    })
                }
            </ul>
            { editable ? <button onClick={(e) => {e.preventDefault(); setEditing(true)}}>Edit</button> : <></> }
        </div>
    }
}

export default SingleQuestionTeacher