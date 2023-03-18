import React, {useEffect, useState} from "react";
import { Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import apiUtil from '../utils/apiUtil'
import useCourse from "../hooks/useCourse";
import StudentCourse from "../components/SingleCoursePageComponents/StudentCourse";
import TeacherCourse from "../components/SingleCoursePageComponents/TeacherCourse";

function DisplayCoursePage(){
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