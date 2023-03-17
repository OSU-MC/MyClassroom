import React, {useEffect, useState} from "react";
import { Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'
import useCourse from "../hooks/useCourse";
import StudentCourse from "../components/SingleCoursePageComponents/StudentCourse";
import TeacherCourse from "../components/SingleCoursePageComponents/TeacherCourse";

//replcae this with the API call. (Finsished)
//const course = require('./data/courseData.json') 

//localhost:3000/homepage/course/1

//This function is going to be used to display the single course page from when the
//user selects the course.  
function DisplayCoursePage() {
//using useParams() here to grab the number in the course they select then finding the data
//associated with that course.
    let { courseId } = useParams()

    const [ course, role ] = useCourse()
    console.log(course)
    console.log(role)



//useEffect(() => {

    // async function getCourseData() {
    //     try {
    //         const response = await apiUtil('get', `courses/`)
    //         if (response.status === 200) {
    //             setCourseStudentData = response.data.studentCourses
    //             console.log("courseStudentData== ", courseStudentData)
    //             setCourseTeacherData = response.data.teacherCourses
    //             console.log("courseTeacherData== ", courseTeacherData)
    //          }
    //     } catch (error) {
    //         if (response.status === 404) {
    //             setCourseStudentData = null
    //             setCourseTeacherData = null
    //             console.log("404 error Response== ", response.data.error)
    //             alert("404.....This resource doesn't exist!")
    //         }
    //         else {
    //             setCourseStudentData = null
    //             setCourseTeacherData = null
    //             console.log("Error happend when grabbing SingleCoursePage== ", response.data.error)
    //             alert("Sorry, there was an error that occurred!")
    //         }
    //     }
    // }
    // getCourseData()

//}, [] )

    return (
        <>
            {(role == 'student') ? <StudentCourse course={course}/> : <></>}
            {(role == 'teacher') ? <TeacherCourse course={course}/> : <></>}
        </>
    )

// if(courseStudentData && courseTeacherData === null){
//     //continue displaying
//     return(<h1>in if statement rn</h1>)
// }

// else{
//     return(
//         <div>
//         <button>Edit Course</button>
//         <button>Create a Section</button>
//         <button>Create a Lecture</button>
//         <button>Access a Session</button>
//         <button>View Roster</button>
//         </div>
//     )
// }

/*if (check the role) === "Teacher" {
 display students enrolled
 edit course
 create a section
 create lecture
 acccess lecture
 access session
}*/



/*else if (check the role) == "Student"
list of lectures
gradebook link nav
*/


}

export default DisplayCoursePage