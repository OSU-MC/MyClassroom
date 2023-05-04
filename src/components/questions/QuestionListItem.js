import { React, useState, useRef, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  { stageQuestionInLecture, unstageQuestionInLecture, addStagedQuestions } from '../../redux/actions'

function QuestionListItem(props) {
    const checkRef = useRef("")
    const { lectureId } = useParams()
    const dispatch = useDispatch()
    const link = `${props.question.id}`

    useEffect(() => {
        if (props.selectable)
            checkRef.current.checked = props.staged
    }, [props.staged])

    const handleCheck = () => {
        if (checkRef.current.checked)
            dispatch(stageQuestionInLecture(lectureId, props.question))
        else
            dispatch(unstageQuestionInLecture(lectureId, props.question))
    }

    return <div className="questionListItem">
        <div className="checkboxContainer">
            { props.selectable && <input className="checkbox" ref={checkRef} type="checkbox" onChange={handleCheck}/> }
        </div>
        <NavLink className="basicLink questionListItemInformation" to={link}>
            <div className="questionStem">{props.question.stem}</div>
            <div className="questionType">{props.question.type}</div>
        </NavLink>
    </div>

}

export default QuestionListItem