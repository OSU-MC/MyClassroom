import React, {useEffect, useState} from "react";
import { Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'
import useCourse from "../hooks/useCourse";
import StudentCourse from "../components/SingleCoursePageComponents/StudentCourse";
import TeacherCourse from "../components/SingleCoursePageComponents/TeacherCourse";

//replcae this with the API call. (Finsished)
//const course = require('./data/courseData.json') 


//This function is going to be used to display the single course page from when the
//user selects the course.  
function DisplayCoursePage(){


//using useParams() here to grab the number in the course they select then finding the data
//associated with that course.
    let { courseId } = useParams()

    const [ course, role ] = useCourse()
    console.log(course)
    console.log(role)

return(
    <div className="singleCourseContainer">
        
        <div className="singleCourseDetails">
        {(role == 'student') ? <StudentCourse course={course}/> : <></>}
        {(role == 'teacher') ? <TeacherCourse course={course}/> : <></>}
        </div>

        <div className="singleCourseBtnDiv">
            <button>Edit Course</button>
            <button>Create a Section</button>
            <button>Create a Lecture</button>
            <button>Access a Session</button>
            <button>View Roster</button>
        </div>
        
    </div>
)


}

export default DisplayCoursePage