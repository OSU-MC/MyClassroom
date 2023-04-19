import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserState } from '../redux/selectors'
import { login } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'

function useAuth() {
    const user = useSelector(getUserState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ error, setError ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        async function authenticate() {
            const response = await apiUtil("get", "users/authenticate", { dispatch: dispatch, navigate: navigate});
            setLoading(false)
            setError(response.error)
            setMessage(response.message)
            if (response.status === 200) {
                dispatch(login(response.data.user, response.data.status))
            }
        }
        if (user.id == null) {
            setLoading(true)
            authenticate()
        }
    }, [])

    return [ (user && user.user) ? user.user.id != null : false, message, error, loading ]
}

export default useAuth