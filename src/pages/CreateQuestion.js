import { useParams } from 'react-router-dom'
import SingleQuestionTeacher from '../components/questions/SingleQuestionTeacher'

function CreateQuestion(props) {
    return <div className="contentView">
            <SingleQuestionTeacher editing={true} editable={true}/>
        </div>
}

export default CreateQuestion