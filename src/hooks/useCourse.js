import { useEffect, useState } from 'react'
import useCourses from './useCourses'
import { useParams } from 'react-router-dom'

function useCourse() {
    const { courseId } = useParams()
    const courses = useCourses()
    const [ course, setCourse ] = useState({})
    const [ role, setRole ] = useState("")

    useEffect(() => {
        function findCourse() {
            courses.teacherCourses.forEach((teacherCourse) => {
                if (teacherCourse.id == courseId) {
                    setCourse(teacherCourse)
                    setRole('teacher')
                }
            })
            courses.studentCourses.find((studentCourse) => {
                if (course.id == courseId) {
                    setCourse(studentCourse)
                    setRole('student')
                }
            })
        }
        if (courses.teacherCourses != null && courses.studentCourses != null)
            findCourse()
    }, [ courses ])
    
    return [ course, role ] 
}

export default useCourse