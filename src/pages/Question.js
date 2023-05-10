import { useParams } from 'react-router-dom'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'

function Question(props) {
    const { questionId } = useParams()
    const create = props.create

    if (create) {
        return <SingleQuestionTeacher/>
    }
    else {
        return <h1>{`Question View for Question with ID ${questionId}`}</h1>
    }
}

export default Question