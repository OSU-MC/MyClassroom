import React from 'react'
import CourseCard from '../components/CourseCard'
import {Button} from "react-bootstrap"
import CourseData from "./data/courseData.json"

function StudentLandingPage() {
    return(
        <div id="student-courses">
             {
                 CourseData.map(course => 
                    <CourseCard CourseNumber={course.course_num} CourseName={course.course_name} CourseCRN={course.crn} CourseInstructor={course.course_instructor} view={"student"} />
                    
                 )
             }
        </div>
    );
}

export default StudentLandingPage;