import apiUtil from '../utils/apiUtil'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//use the questioninlecture get api to get the publish state of a question 
//TODO? this is getting a question that should already exist in the redux, but with extra details, should it be updated anyway?
function useQuestionInLecture(questionId){
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const { courseId, lectureId } = useParams()

    useEffect( () => {
        async function getQuestionInLecture(){
            setLoading(true)
            const response = await apiUtil("get", `/courses/${courseId}/lectures/${lectureId}/questions/${questionId}`, { dispatch: dispatch, navigate: navigate})
            setMessage(response.message)
            setError(response.error)
            console.log("response for publish: ", response)

            //no redux to update since we are just re-requesting the same question
            /*TODO? have the publish state stored in the question*/

            setLoading(false)
            return response.data.published
        }

        if(questionId != null){
            setPublished(getQuestionPublishState())
            console.log(published)
        }
    }, [])

    
    return [published, message, error, loading]
}
    

export default useQuestionInLecturePublishState;
