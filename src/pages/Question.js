import { useParams } from 'react-router-dom'

function Question(props) {
    const { questionId } = useParams()
    const create = props.create

    return <div>Question Page for Teacher {create ? "to Create a Question" : `to View/Edit Question with ID ${questionId}`}</div>
}

export default Question