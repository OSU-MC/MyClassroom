import apiUtil from '../utils/apiUtil'
import { addQuestions } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../redux/selectors'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function useQuestions() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const questions = useSelector(getQuestions)
    const { courseId } = useParams()
    const [ error, setError ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ loading, setLoading ] = useState(true)

    useEffect( () => {
        async function getQuestions(){
            setLoading(true)
            const response = await apiUtil("get", `courses/${courseId}/questions`, { dispatch: dispatch, navigate: navigate} );
            setMessage(response.message)
            setError(response.error)
            if (response.status === 200) {
                dispatch(addQuestions(courseId, response.data.questions))
            }
            setLoading(false)
        }
        if (questions[courseId] == null) {
            getQuestions()
        }
    }, [])

    return [questions, message, error, loading]
}

export default useQuestions