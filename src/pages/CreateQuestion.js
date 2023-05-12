import { useParams } from 'react-router-dom'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'

function CreateQuestion(props) {
    return <SingleQuestionTeacher editing={true} editable={true}/>
}

export default CreateQuestion