import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserState } from '../redux/selectors'
import { login } from '../redux/actions'
import apiUtil from '../utils/apiUtil'

function useAuth() {
    const user = useSelector(getUserState)
    const dispatch = useDispatch()

    useEffect(() => {
        async function authenticate() {
            let response
            try {
                response = await apiUtil("get", "users/authenticate");
                dispatch(login(response.data.user, response.data.status))
            } catch (e) {
                if (!e.response || e.response.status !== 401) {
                    console.log(e)
                    throw e;
                }    
            }
        }
        if (user.id == null) {
            authenticate()
        }
    }, [])

    return user.user.id != null
}

export default useAuth