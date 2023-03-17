import apiUtil from '../utils/apiUtil'
import { setCourses, logout } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../redux/selectors'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useCourses(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const courses = useSelector(getCourses)

    useEffect( () => {
        async function populateCourses(){
            let response
            try {
                response = await apiUtil("get", "courses/");
                //send the data to the redux so it can be used elsewhere
                dispatch(setCourses(response.data.studentCourses, response.data.teacherCourses))
            } catch (e) {
                if (e.response.status === 401) {
                    dispatch(logout())
                    navigate(`/login?redirect=${location.pathname}`)
                }
                else{
                    console.log(e)
                    throw e;
                }    
            }
        }
        if (courses.studentCourses == null || courses.teacherCourses == null) {
            populateCourses()
        }

    }, [])

    return courses
}

export default useCourses