import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'

function QuestionListItem(props) {
    const [ checked, setChecked ] = useState(false)
    const link = `${props.question.id}`

    const handleCheck = () => {
        setChecked(!checked)
    }

    return <div className="questionListItem">
        <div className="checkboxContainer">
            { props.selectable && <input className="checkbox" type="checkbox" checked={checked} onChange={handleCheck}/> }
        </div>
        <NavLink className="basicLink questionListItemInformation" to={link}>
            <div className="questionStem">{props.question.stem}</div>
            <div className="questionType">{props.question.type}</div>
        </NavLink>
    </div>

}

export default QuestionListItem